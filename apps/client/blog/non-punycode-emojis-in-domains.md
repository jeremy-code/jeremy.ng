---
title: Non-punycode emojis in domains
lede: Emojis that when encoded in punycode for domains become text
authors:
  - name: Jeremy Nguyen
tags:
  - unicode
  - emoji
mastodonId: "117448512396857674"
---

> **tl;dr**: When they were first introduced, Unicode added existing non-pictograph emojis for compatibility with Japanese carriers and unified them with pre-existing text-style counterparts, including `"Ⓜ️"`, `"ℹ️"`, `"™️"` (`"Ⓜ"`, `"ℹ"`, `"™"`). Since this changed the appearance of existing documents, they later added a presentation selector code point to differentiate between text and emoji style. Hence, after being mapped to their normalized forms, `"Ⓜ"`, `"ℹ"`, `"™"` become `"m"`, `"i"`, `"tm"`, respectively, and the emoji presentation selector is silently ignored.

While browsing the Wikipedia article for [Emoji domain](https://en.wikipedia.org/wiki/Emoji_domain), I stumbled upon the following line that struck me as interesting:

> With the exception of three emoji (TM-™️, Information-ℹ️ and M-Ⓜ️), for an emoji to work reliably in a domain name, it must be converted into so-called "Punycode".

The lack of a citation and the seemingly arbitrary emoji choices given made me doubt its reliability. Still, I thought it would be really interesting if it were true that some emojis were for some reason exempt from being encoded to punycode. That bit of trivia was added in December 2025 by an anonymous user with no source attached.[^1]

I searched on Google and couldn't find any source corroborating that claim. Despite that, surprisingly, this trick seems to actually hold true. For example, the websites https://Ⓜ️icrosoft.com, https://ℹ️nstagram.com, and https://www.™️z.com do end up routing to their correct counterparts, whereas https://facebo🆗.com, https://🅿️interest.com, https://g🅾️ogle.com do not.

## Brief summary of Punycode

Punycode is a way to encode Unicode text into ASCII characters intended for use with internationalized domain names (IDNA).[^2] Since domain names can only include ASCII characters,[^3] this was necessary to be able to support non-English languages. For compatibility with existing ASCII domain names, these punycode sequences are prepended with `"xn--"`.[^4] Browsers like Google Chrome and Firefox have somewhat complex policies in place to determine whether hostnames should be displayed in their ASCII punycode forms or their intended Unicode form.[^5]

## Verifying this claim with Python

The goal is simple: use the [emoji](https://pypi.org/project/emoji/) package from PyPI to brute force a solution by iterating through all possible emojis. This way, we can find any emojis that don't encode into punycode (i.e., do not start with `"xn--"`) and are instead encoded into only ASCII characters. Fortunately, Python provides a codec for IDNA 2003 by default.[^6]

```py
from emoji import EMOJI_DATA
import json

punycode_by_emoji = {}

for emoji in EMOJI_DATA.keys():
    try:
        punycode = emoji.encode("idna")
        if not (punycode.startswith(b"xn--")):
            punycode_by_emoji[emoji] = punycode.decode("utf-8")
    except UnicodeEncodeError:
        pass

print(json.dumps(punycode_by_emoji, ensure_ascii=False)) # Allow emoji
```

```json
{
  "Ⓜ️": "m",
  "Ⓜ": "m",
  "‼️": "!!",
  "‼": "!!",
  "⁉️": "!?",
  "⁉": "!?",
  "ℹ️": "i",
  "ℹ": "i",
  "™️": "tm",
  "™": "tm"
}
```

Interesting... While `"‼️"` and `"⁉️"` were not included in our original list, those characters are effectively irrelevant, as exclamation points and question marks are forbidden in URIs.[^7]

The most noteworthy shared quality between all of these emojis is that they all have both a text style and an emoji style presentation. Essentially, emoji characters can default to a text-based and pictographic-based representation. For example, the emoji character `"Ⓜ"` (`\u24c2`) defaults to a text representation. However, by adding either a text presentation selector or an emoji presentation selector, you can force one variant. For example, `"Ⓜ️"` and `"Ⓜ︎"` are represented by `\u24c2\ufe0f` and `\u24c2\ufe0e`, respectively.[^8]

Interestingly, for some reason, other textual emojis, such as `"🅰️"`, `"🆔"`, `"🅾️"`, `"🅿️"`, `"🆎"`, `"🅱️"`, `"0️⃣"`-`"9️⃣"`, have seemingly been excluded. Why is that?

## What makes these characters special?

In a Microsoft blog post, Raymond Chen documented an unclear security report where a user reported that, as expected, `https://ⓜicrosoft.com` goes to [https://microsoft.com](https://microsoft.com).[^9] I had not found this initially since it cites the text style instead of the emoji style, but he notes that:

> The web browser is doing exactly what the standard says it’s supposed to do: Unicode Technical Standard #46 describes how so-called international domain names are converted to ASCII for domain lookup purposes. One of the steps is to map the code points according to the IDNA Mapping Table, and the IDNA Mapping Table says that character CIRCLED LATIN SMALL LETTER M (U+24DC) is mapped to LATIN SMALL LETTER M (U+006D).[^9]

Indeed, viewing the [IDNA mapping table](https://www.unicode.org/Public/idna/15.1.0/IdnaMappingTable.txt), you can verify that his statement is true, and that `"ⓜ"` does map to `"m"`. Furthermore, all variation selectors are simply ignored, meaning they map to nothing.[^10] This document, [Unicode Technical Standard #46](https://unicode.org/reports/tr46/), also reports that the IDNA mapping table was derived via NFKC_Casefold.[^11]

Since NFKC normalization is built into JavaScript, we can use a quick Node.js script using the [emojis-list](https://npmx.dev/package/emojis-list) library and find all the emojis that, when normalized with NFKC, output something other than themselves.

```js
import emojis from "emojis-list";

const unidempotentEmoji = emojis.reduce((acc, emoji) => {
  const normalizedEmoji = emoji.normalize("NFKC");

  if (normalizedEmoji !== emoji) {
    acc[emoji] = [
      normalizedEmoji,
      Array.from(
        normalizedEmoji,
        (c) => "U+" + c.codePointAt(0).toString(16).padStart(4, "0"),
      ),
    ];
  }
  return acc;
}, {});

console.log(unidempotentEmoji);
```

```jsonc
{
  "🈁": ["ココ", ["U+30b3", "U+30b3"]], // "here"
  "🈂️": ["サ️", ["U+30b5", "U+fe0f"]], // "service charge"
  "🈚️": ["無️", ["U+7121", "U+fe0f"]], // "free of charge"
  "🈯️": ["指️", ["U+6307", "U+fe0f"]], // "reserved"
  "🈲": ["禁", ["U+7981"]], // "prohibited"
  "🈳": ["空", ["U+7a7a"]], // "vacancy"
  "🈴": ["合", ["U+5408"]], // "passing grade"
  "🈵": ["満", ["U+6e80"]], // "no vacancy"
  "🈶": ["有", ["U+6709"]], // "not free of charge"
  "🈷️": ["月️", ["U+6708", "U+fe0f"]], // "monthly amount"
  "🈸": ["申", ["U+7533"]], // "application"
  "🈹": ["割", ["U+5272"]], // "discount"
  "🈺": ["営", ["U+55b6"]], // "open for business"
  "🉐": ["得", ["U+5f97"]], // "bargain"
  "🉑": ["可", ["U+53ef"]], // "acceptable"
  "‼️": ["!!️", ["U+0021", "U+0021", "U+fe0f"]],
  "⁉️": ["!?️", ["U+0021", "U+003f", "U+fe0f"]],
  "™️": ["TM️", ["U+0054", "U+004d", "U+fe0f"]],
  "ℹ️": ["i️", ["U+0069", "U+fe0f"]],
  "Ⓜ️": ["M️", ["U+004d", "U+fe0f"]],
  "㊗️": ["祝️", ["U+795d", "U+fe0f"]], // "congratulations"
  "㊙️": ["秘️", ["U+79d8", "U+fe0f"]], // "secret"
}
```

The result of this script is indeed a superset of our previous list of emoji, only this time with various Japanese characters. This does make sense, as Japanese characters are not ASCII-compatible and would need to be encoded into punycode to be used as a domain name.

Again, the aforementioned `\ufe0f` emoji variation selector appears, though this time not in every emoji. In particular, only the emojis `"🈂"`, `"🈚"`, `"🈯"`, `"🈷"`, `"㊗"`, `"㊙"` use a presentation selector. This also makes sense since those emojis are also the only ones listed to have an emoji presentation sequence, whereas the rest default to emoji.[^12]

Furthermore, using one of these Japanese character emojis, we can verify our theory using a Japanese domain. `.jp` domains can use the Kanji, Hiragana, and/or Katakana character sets.[^13] The website for the Kokuzōsan Daimanji Temple (虚空蔵山　大満寺) in Sendai, Japan is located at http://虚空蔵尊.jp and contains the kanji "空" (empty/vacant). Hence, a URL like http://虚🈳蔵尊.jp should correctly route to its intended destination. And indeed, it does.

However, this does raise another question, and that is, what makes _these_ emoji in particular special?

## Compatibility and Unicode

If you ever wonder why a strange Unicode character exists, 9/10 times it'll be because of compatibility with older systems. For example, the somewhat strange Man in Business Suit Levitating emoji (`"🕴"`) was added in 2014 for compatibility with the 1997 font Webdings.[^14]

Hence, to understand this behavior, we have to look back to the history of emojis.

On March 5, 2009, the ["Proposal for Encoding Emoji Symbols"](https://www.unicode.org/L2/L2009/09025r2-emoji.pdf) was filed, the document that would introduce emoji into Unicode. Specifically, the reason given for the proposal was compatibility with the top three carriers in Japan: NTT DoCoMo, KDDI, and SoftBank. Indeed, the document provides a hint for this behavior:[^15]

> Existing UCS symbols are used where appropriate. This includes unifications with "upcoming" characters in ISO/IEC 10646 AMD6 and Unicode 5.2. In particular, some unifications are with symbols from the ARIB set...
> Characters were disunified in a small number of cases, where the visual images were very different and not semantically associated. For example, the 'M' symbol for Metro is disunified from the Metro train image.[^15]

Indeed, we can view all the emojis they intended to introduce here: [N3681 - Emoji Symbols: Background Data](https://www.unicode.org/wg2/docs/n3681.pdf). This list includes the emojis we are searching for: `"Ⓜ️"`, `"ℹ️"`, `"™️"`.

<table>
  <thead>
    <tr>
      <th>Unicode code point</th>
      <th>Emoji</th>
      <th>DoCoMo</th>
      <th>KDDI</th>
      <th>SoftBank</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>U+203C</td>
      <td>‼️</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAP8AAP///yH5BAEAAAEALAAAAAAMAAwAAAIZjI8JGwvKHDRstmcrwi3Rw22gR2YhhWlBAQA7"
          alt="‼️"
          width="12"
          height="12"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIFAP9mZv+ZmcwAAJkAAP8AAP///wAAAAAAACH5BAEAAAUALAAAAAAOAA8AAAMtWLrcSoLBRgAZz+JFwn3eBn5FR2ZkdT4R10piGT/xSsNOnnsM3wgxoG5IZCQAADs="
          alt="‼️"
          width="14"
          height="15"
        />
      </td>
      <td></td>
      <td>double exclamation mark</td>
    </tr>
    <tr>
      <td>U+2049</td>
      <td>⁉️</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAMxm/////yH5BAEAAAEALAAAAAAMAAwAAAIajI8Ia8vN4ptnghRsehnfuoUKRlYfpJzZWQAAOw=="
          alt="⁉️"
          width="12"
          height="12"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIFAP+ZmcwAAP9mZpkAAP8AAP///wAAAAAAACH5BAEAAAUALAAAAAAOAA8AAAM2WLrcFExIsoggQ11CAC0dVlxDaWWWSCon+GQFxAqw6NAVXNms3js+ULBBXHgaR0YguCw6n84EADs="
          alt="⁉️"
          width="14"
          height="15"
        />
      </td>
      <td></td>
      <td>exclamation question mark</td>
    </tr>
    <tr>
      <td>U+2122</td>
      <td>™️</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAwAAAIXjI+pywEPD0DTzUfNdZlvqYFixTXmqRQAOw=="
          alt="™️"
          width="12"
          height="12"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAJECAAAAZv///////wAAACH5BAEAAAIALAAAAAAOAA8AAAIklI+py+0SopQwQoBxAJLfDWpaBUbcGRhmx6abCHvTPD32jSsFADs="
          alt="™️"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACwAAAAADwAPAITAwMAiIiL///8BAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMCIJSPqcvtD2GYE4QTwNGX56lcxmeFmMAllraiWQTHclIAADs="
          alt="™️"
          width="15"
          height="15"
        />
      </td>
      <td>trade mark</td>
    </tr>
    <tr>
      <td>U+2139</td>
      <td>ℹ️</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIFAADM/zOZ/2Zm/wAA/wAzmf///wAAAAAAACH5BAEAAAUALAAAAAAOAA8AAAMkWLrcLNA9EAaRSlSLFfld+GwD53yCBWLpFbYizJJm892rqEsJADs="
          alt="ℹ️"
          width="14"
          height="15"
        />
      </td>
      <td></td>
      <td>information</td>
    </tr>
    <tr>
      <td>U+24C2</td>
      <td>Ⓜ️</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAP+SAP///yH5BAEAAAEALAAAAAAMAAwAAAIZBIKJxrrcEpyPzgPrCfnJ6HCg04UlOSpGAQA7"
          alt="Ⓜ️"
          width="12"
          height="12"
        />
      </td>
      <td></td>
      <td></td>
      <td>circled M</td>
    </tr>
    <tr>
      <td>U+1F202</td>
      <td>🈂️</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIEAP9mM////5kAAP8AAP///wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA8AAAM7SLrc8DAC9cYI9mZBQA6CBVqcF5woOpQkKAju233hVbNiPa7zlpO9jOYWVNV4ns1LqXg5n7KGdEpdJAAAOw=="
          alt="🈂️"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAACf/wA8sf///66hrCRz/4GBgQC1/wAAACH5BAAAAAAALAAAAAAPAA8AAANIaLqsJMKASSsgZcgpAvdXtgHdN2EaCa1rgEpB0MWzK1IlCb44mPOTmCmUssxONw5EiCwCYswmYUqtUjOCgnbL3Q4Eg7B4PE4AADs="
          alt="🈂️"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "service charge" button</td>
    </tr>
    <tr>
      <td>U+1F237</td>
      <td>🈷️</td>
      <td></td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPALMAAAAAAP9tRvI5AP/58P+rPP/Upv9QScnR/8QTAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAARTkJRJKyU46M0DEYRmAGRJGgGoAcfgvgeQhgEwmOQ9r7fgCzaZqjZovVxCWhCnGwZ/wKayeETuRjdmctQCCAzg4MzQRa26qdSJMwIYBAioHIpARAAAOw=="
          alt="🈷️"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "monthly amount" button</td>
    </tr>
    <tr>
      <td>U+1F236</td>
      <td>🈶</td>
      <td></td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPALMAAAAAAP9tRvI5AP/58P+rPP/Upv9QScnR/8QTAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAARUkJRJKyU46AD2JgKhAeRAnlrIHUPrDgdgqMJpnoAwi0F9n7oeDwB7xVIiotLWEQJixJcJSfLhpsKAgSPFqnrLUjO0Xfqms56huq3lZgiBfE6fIxARADs="
          alt="🈶"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "not free of charge" button</td>
    </tr>
    <tr>
      <td>U+1F22F</td>
      <td>🈯</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIHAJnMmWaZZgAzADPMMwCZAABmAP///////yH5BAEAAAcALAAAAAAOAA8AAANFeLrc8zAO9YghFutyBjaFFRoXN5CklRZsRxQgzI7mN6Kk4KrYPHcoFi7mklkAgQDRI7IEhC0P6RbkHFgCATabbXi/YEYCADs="
          alt="🈯"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAACfaf///66hrIGBgQBdAAC9TgAAAAAAACH5BAAAAAAALAAAAAAPAA8AAANBWLqsFKEAEGadkwwhqbWVxkEQVWZbd12WqIJk4IJY7ZJwOXu8t68xwO/zmZ1ioQ1hyWwyN4GBdEqdCgKCrHa7TQAAOw=="
          alt="🈯"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "reserved" button</td>
    </tr>
    <tr>
      <td>U+1F250</td>
      <td>🉐</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIEADOZMwBmAP8AM//MAP///wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA8AAAM1SLrcKxA6Aoe18tkwgueCxnUDACoCyX3eEKbkFb/dyp7weI0hFY8nVGwTRMEumUYkOWk6HQkAOw=="
          alt="🉐"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAP9QAP///66hrO9cAIGBgf9vAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAANBWLqsE6EAECa8YBAhq51UthVedUEi94WfppYn5JIeyM5hfOE16PG+FdB2G7F8v81gyWwyNwGCdEqdCgKCrHa7TQAAOw=="
          alt="🉐"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "bargain" button</td>
    </tr>
    <tr>
      <td>U+1F239</td>
      <td>🈹</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIGAP9mM2YzAP+ZM/9mAJkzAP///////wAAACH5BAEAAAYALAAAAAAOAA8AAANCaLrc8jAC9cYoNl9iRPkgJgZdQRAmqhakcIWWyXaWem6zF354O5zAk8y3y6CIQFNmBniBCLGZ4RSoVoGkhnbLXSQAADs="
          alt="🈹"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAP8AS////66hrIGBgfIAUf9dnQAAAAAAACH5BAAAAAAALAAAAAAPAA8AAANCWLqsFKGAGaYFgQxRoIcYpnFVGFbZJlEXOkpf6apWyaZkjIr0VfMczKf1MhmBsCEFR2g6n85NYECtWquCgGDL7XYTADs="
          alt="🈹"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "discount" button</td>
    </tr>
    <tr>
      <td>U+1F21A</td>
      <td>🈚</td>
      <td></td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPALMAAAAAAP/58PI5AP9tRsnR//9QSf+rPP/UpsQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAARX0JxJKzV4DFC014ZgaEDAfZ64BQTgvqcIEEFt1+0gFm7rz66CjHa7tXY94I+jmhVxzBEPBhPoRiWXqQW8llqsrxgJELjM5aBVUOi0B++2ACGo2+92BCICADs="
          alt="🈚"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "free of charge" button</td>
    </tr>
    <tr>
      <td>U+1F232</td>
      <td>🈲</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAP8AAP///yH5BAEAAAEALAAAAAAMAAwAAAIdDI5pwe3XQGQwKWhkprJX74SbhWzT01GqKaqkUgAAOw=="
          alt="🈲"
          width="12"
          height="12"
        />
      </td>
      <td></td>
      <td></td>
      <td>Japanese "prohibited" button</td>
    </tr>
    <tr>
      <td>U+1F251</td>
      <td>🉑</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAJECAP8zAP/MAP///wAAACH5BAEAAAIALAAAAAAOAA8AAAIrlI95wKDGggwsgYkpuq1pmFGTI1xUZH4mJ0rkio5Ltm5Y9C3p+ZRNDww+CgA7"
          alt="🉑"
          width="14"
          height="15"
        />
      </td>
      <td></td>
      <td>Japanese "acceptable" button</td>
    </tr>
    <tr>
      <td>U+1F238</td>
      <td>🈸</td>
      <td></td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAP9tRgAAAP////I5AP+rPP/UpsnR/8QTACH5BAAAAAAALAAAAAAPAA8AAANBSLXcTBBIGaYkg1gQRLXZFIzeOIWcIayr8aEdKUswa78aV+44pdouWo4jMwk3sQ1K5FEOKU3QhqI8DK7YLPZwSAAAOw=="
          alt="🈸"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "application" button</td>
    </tr>
    <tr>
      <td>U+1F234</td>
      <td>🈴</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAP8AAP///yH5BAEAAAEALAAAAAAMAAwAAAIdDI5pwe33QGxyMWhShfXlq4GX91ljqW2dQ2UpVAAAOw=="
          alt="🈴"
          width="12"
          height="12"
        />
      </td>
      <td></td>
      <td></td>
      <td>Japanese "passing grade" button</td>
    </tr>
    <tr>
      <td>U+1F233</td>
      <td>🈳</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAAAA/////yH5BAEAAAEALAAAAAAMAAwAAAIeDI5pwe33nAEzwbto1hzNJTFQ5X2NdlKWN4YiuQYFADs="
          alt="🈳"
          width="12"
          height="12"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIHAABmzDOZ/wAzZjPM/wBmmQCZ/////////yH5BAEAAAcALAAAAAAOAA8AAANCeLrc8zAGNUK5xeALzjBgKBqERxLniQpegboZgbGfJmdiObj3RfwEGm4EcrV4KCDwiCFtSgHiqHQACK7YbGPL7TISADs="
          alt="🈳"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAAA8sf///66hrCYSV4GBgSRz/wAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAM/WLqsE6GAOQOdg4gCu4fZZgHjSIYSSZkACl0fes2YJn1ea8+svvEzGSxow8U0g6RyqdQECNCoNCoICK7YbDYBADs="
          alt="🈳"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "vacancy" button</td>
    </tr>
    <tr>
      <td>U+3297</td>
      <td>㊗️</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAJECAP////8AAP///wAAACH5BAEAAAIALAAAAAAOAA8AAAIvlI9pwR3KgJQMBXBxw0vfDAoZRpbPB25cxJYrpZGfCMty91GNNfVP4tgphsSioAAAOw=="
          alt="㊗️"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACwAAAAADwAPAIT/MwD/ZjP/mZn/zMz///8BAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMDRUg6Au5iqNmeBYI6Ei4kw5MBQUZUjNUQW1WRSsCengJMZ2fR8S3ol57J42PdZBvIgzUyMkNJDkbRkFSMHhONOMWlVBJFAgA7"
          alt="㊗️"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "congratulations" button</td>
    </tr>
    <tr>
      <td>U+3299</td>
      <td>㊙️</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAP8AAP///yH5BAEAAAEALAAAAAAMAAwAAAIeDI5pwe3XAJNTwmeonjnb1S2QZo3fVT6blzpumSgFADs="
          alt="㊙️"
          width="12"
          height="12"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIFAJmZZjOZMwBmAP8AM//MAP///wAAAAAAACH5BAEAAAUALAAAAAAOAA8AAAM6WLrcOxC6Aom18lmx73gCd3HCR3VX9w1EKABtTKxEIAQbcM8UGYcxE0sExGh8Lt6Dlco0Is6JdOpIAAA7"
          alt="㊙️"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACwAAAAADwAPAIT/MwD/mZn///8BAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMBAgMCL5QDqRB2C1MTytQlkIOU8pt44QZ4IgaeY8mqa2eiHRtGpovUM92AJfmILCZBCLEAADs="
          alt="㊙️"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "secret" button</td>
    </tr>
    <tr>
      <td>U+1F23A</td>
      <td>🈺</td>
      <td></td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIFADMzZsyZ/5lm/2Yzmf///////wAAAAAAACH5BAEAAAUALAAAAAAOAA8AAAM9WLrc8TAK9QQRFl8xSiBgKBLdN5woSgAeN4IYG2jpQHKt9Q74jNm1nu51KVlqJ1JHQ1QqToCoVNqoWq+MBAA7"
          alt="🈺"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAP9QAP///66hrL9dAIGBgf+OAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAM/WLqsE6EAEGalcxBRoP+Qxl1TaYkSBV6oZWJAq4LZlrpvu3qxDb8V3cul2wU3g6RyqdwECNCoNCoICK7YbDYBADs="
          alt="🈺"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "open for business" button</td>
    </tr>
    <tr>
      <td>U+1F235</td>
      <td>🈵</td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDAAMAIABAP8AAP///yH5BAEAAAEALAAAAAAMAAwAAAIdDI5pwe23ImCQpgmntO1i/XSgZ2Dbt3wZ6HSlBxUAOw=="
          alt="🈵"
          width="12"
          height="12"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDgAPAKIFAGYAM/9mzJkzZv8zmf///////wAAAAAAACH5BAEAAAUALAAAAAAOAA8AAANCWLrc8TAG9ci4dmRRAtZEKHLeJWiCQKRAl4FiSGrXoKZsZ8Jx62WrVYrgQ6GCGp/lFAsqT0YMUSEA4KzXhnbLZSQAADs="
          alt="🈵"
          width="14"
          height="15"
        />
      </td>
      <td>
        <img
          src="data:image/png;base64,R0lGODlhDwAPAKIAAP8EAP///66hrIGBgf8AE/9QSQAAAAAAACH5BAAAAAAALAAAAAAPAA8AAANCWLqsFKGAACqdlQwhMfyQxlXkdYnFNYHhJqkYiZIrO5fxNJue7sYsH0cFE6ZwpYCIwGw6m5vAYEqtUgUBgXbL5SYAADs="
          alt="🈵"
          width="15"
          height="15"
        />
      </td>
      <td>Japanese "no vacancy" button</td>
    </tr>
  </tbody>
</table>

NTT DoCoMo used a "M" symbol to represent the Metro emoji. In an earlier working draft, it was written that they "disunified the 'M' symbol for Metro from the Metro train image" since the symbol would "have translations problems.[^16]" The "information" emoji was used by KDDI. Meanwhile, the "trademark" emoji was represented by all three of the top carriers. DoCoMo and KDDI both supported `"⁉️"` and `"‼️"` emojis. Our previously-mentioned Japanese character emojis also make an appearance in this table.[^17]

Interestingly, it seems that unification _only_ occurred if there had been a prior pre-existing Unicode symbol (i.e., no new text-style characters had been created). For example, `"🆔"` and `"🆑"` were both introduced in that document, yet are standalone emojis.[^17] In a later proposal, it claims that the emojis had only been unified with "characters or character sequences from Unicode 5.2 or earlier".[^18]

Another interesting detail is that the earlier-mentioned keycap emojis `"0️⃣"`-`"9️⃣"`, `"#️⃣"` were unified into two code points: their ASCII counterpart and `\u20e3` (combining enclosing keycap). This means that in Unicode code points, if we also include the emoji presentation selector, the emoji `"1️⃣"` is `\u0031\ufe0f\u20e3`.[^17] Since `\u20e3` is a valid character in the IDNA mapping table, this means these emojis do not normalize to ASCII and instead are encoded into punycode.

## Will there be any new emojis like this?

I don't expect that any more non-punycode emojis will ever be added again.

### ASCII-normalized emojis

[Unicode Technical Standard #51](https://www.unicode.org/reports/tr51/) explicitly notes that for emojis:

> The data does not include non-pictographs, except for those in Unicode that are used to represent characters from emoji sources, for compatibility, such as: 🈹 or 🆔[^19]

Indeed, this seems to have held true. All the emojis present in the "alphanum" section of the current full emoji list were introduced in that initial Unicode 6.0 release. Furthermore, they are also all legacy emojis from NTT DoCoMo, KDDI, or SoftBank.[^20]

### Emoji unification

Evidently, it seems that some issues may have arisen from emoji unification. In October 2010, the same month the release of Unicode 6.0 would introduce emoji,[^21] "Emoji Variation Sequences" were proposed.[^18] The proposal noted that many systems and users expected their documents to remain displayed as black-and-white characters rather than colorful emojis. Apparently, as a result, black-and-white fonts had been developed. `\ufe0e` and `\ufe0f` were chosen to represent black-and-white text and emoji presentation, respectively.[^18] It would eventually be introduced in Unicode 6.1.[^19]

When one looks to the frequently asked questions page for submitting an emoji, it seems that they no longer accept proposals to emojify existing characters. Apparently, while "\[s]uch proposals were accepted in the past, but that proved to be problematic for a variety of reasons.[^22]" In fact, in 2023, the Unicode Consortium outright stated that they have "determined that unifying text and emoji characters was a mistake." This comment was made on a proposal to disunify 10 characters that had been unified with emoji.[^23] Charlotte Buff, who originally submitted the proposal to add variation sequences for these ten emojis,[^23] claimed the decision was to encode a new character that was not "'tainted' by emoji presentation." Buff provided the example of the inverse of this with the newer Khanda emoji (`"🪯"`) not being unified with the older Adi Shakti character (`"☬"`).[^24]

Doug Ewell, the proposer of the language subtag registry[^25] and an author of the aforementioned disunification proposal,[^23] wrote that the practice of unifying emojis with older Unicode characters has likely been deprecated.[^26] In particular, he claimed that "'emojifying' existing characters...\[had\] caused some headaches on its own." Ewell also noted that much to his chagrin, he cannot use the copyright, registered trademark, and trademark characters without them being converted to "huge, comical emoji versions" despite the standard specifying they should default to text.[^26]

## Conclusion

Emojipedia claims there are 3,953 emojis in the Unicode standard as of September 9, 2025.[^27] Yet, even as doubtless more emojis are added, there will still only ever be three emojis that punycode will be unable to encode.

<!-- Footnotes -->

[^1]: https://en.wikipedia.org/w/index.php?title=Emoji_domain&diff=prev&oldid=1327349586

[^2]: https://www.rfc-editor.org/info/rfc3492/

[^3]: https://www.rfc-editor.org/info/rfc952/

[^4]: https://www.rfc-editor.org/info/rfc5890/#section-2.3.1

[^5]: https://chromium.googlesource.com/chromium/src/+/main/docs/idn.md

[^6]: https://docs.python.org/3/library/codecs.html#text-encodings

[^7]: https://www.rfc-editor.org/info/rfc3986/#section-2.2

[^8]: https://www.unicode.org/reports/tr51/#Emoji_Variation_Sequences

[^9]: https://devblogs.microsoft.com/oldnewthing/20211109-00/?p=105884

[^10]: https://www.unicode.org/Public/idna/15.1.0/IdnaMappingTable.txt

[^11]: https://unicode.org/reports/tr46/#TableDerivationStep1

[^12]: https://www.unicode.org/emoji/charts-18.0/text-style.html

[^13]: https://jprs.co.jp/en/regist.html

[^14]: https://nymag.com/intelligencer/2014/11/emojis-rapid-evolution.html

[^15]: https://www.unicode.org/L2/L2009/09025r2-emoji.pdf

[^16]: https://www.unicode.org/L2/L2007/07257-emoji-wd.html

[^17]: https://www.unicode.org/wg2/docs/n3681.pdf

[^18]: https://www.unicode.org/L2/L2011/11414-emoji-var-seq.pdf

[^19]: https://unicode.org/reports/tr51/

[^20]: https://unicode.org/emoji/charts/full-emoji-list.html#alphanum

[^21]: https://www.unicode.org/versions/Unicode6.0.0/

[^22]: https://www.unicode.org/faq/emoji_submission.html

[^23]: https://www.unicode.org/L2/L2023/23252-legacy-disunification.pdf

[^24]: https://stackoverflow.com/a/78823097/18551960

[^25]: https://datatracker.ietf.org/person/doug@ewellic.org

[^26]: https://corp.unicode.org/pipermail/unicode/2022-September/010317.html

[^27]: https://emojipedia.org/stats
