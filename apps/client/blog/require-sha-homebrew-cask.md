---
title: Enabling `--require-sha` on all checksum-verifiable Homebrew casks
lede: Require SHA-256 hash on Homebrew casks when it's available
authors:
  - name: Jeremy Nguyen
tags:
  - shell
  - homebrew
mastodonId: "117054139203880820"
---

<!-- Originally posted on https://gist.github.com/jeremy-code/4274adce9f400db8580d857472e07bbd -->

You may want to set `--require-sha` as a default option in your Homebrew casks for extra security, either with the environment variable `HOMEBREW_CASK_OPTS="--require-sha"`[^1] or by adding `cask_args require_sha: true` to your `Brewfile`.[^2]

As Homebrew itself has noted, casks, which use prebuilt binaries from an upstream source, have a different security model compared to formulae built by Homebrew. At the very least, enabling `--require-sha` will guarantee that the downloaded cask has not changed since it was last reviewed by a Homebrew maintainer.[^3]

The thing is: many Homebrew casks do not have a SHA-256 checksum because their download link is not versionable.[^4] The top ten casks in [`Homebrew/homebrew-cask`](https://github.com/Homebrew/homebrew-cask) that have "no_check" set for their SHA-256 according to their JSON analytics data as of August 7, 2026 are the following:[^5]

<!-- prettier-ignore-start -->
| Cask | Place | Install Events (365 days) | % |
|---|---|---|---|
| [google-chrome](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/g/google-chrome.rb#L3) | #6 | 449,427 | 1.81% |
| [spotify](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/s/spotify.rb) | #48 | 97,716 | 0.39% |
| [chromium](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/c/chromium.rb#L5) | #83 | 57,790 | 0.23% |
| [steam](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/s/steam.rb#L3) | #106 | 46,666 | 0.19% |
| [google-drive](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/g/google-drive.rb#L3) | #119 | 39,690 | 0.16% |
| [logi-options+](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/l/logi-options%2B.rb#L37) | #120 | 39,532 | 0.16% |
| [font-source-code-pro](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/font/font-s/font-source-code-pro.rb#L3) | #187 | 19,784 | 0.08% |
| [anydesk](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/a/anydesk.rb#L3) | #200 | 18,714 | 0.08% |
| [termius](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/t/termius.rb#L5) | #233 | 15,240 | 0.06% |
| [onyx](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/o/onyx.rb#L2) | #240 | 14,807 | 0.06% |
| [google-gemini](https://github.com/Homebrew/homebrew-cask/blob/aa45e6dcc972cce894dcd31b009f7f930f106676/Casks/g/google-gemini.rb#L3) | #276 | 11,895 | 0.05% |
<!-- prettier-ignore-end -->

<!--
The data for the table above was generated with the following script:

```shell
#!/bin/zsh

# Run `wget https://formulae.brew.sh/api/analytics/cask-install/365d.json`
# beforehand to download the file

input_file="365d.json"

# Remove casks from outside taps (i.e. anything containing a forward slash)
casks=("${(@f)$(jq --raw-output '.items[].cask | select(.|test("\/")|not)' "$input_file")}")

# Limit to first 300 casks
input=$(brew info --quiet --cask --json=v2 "${casks[@]:0:300}")

jq --raw-output '
  .casks[]
  | select(.sha256 == "no_check")
  | .token
' <<< "$input"
```
-->

For more information on this concern, see the following issue on GitHub: [Homebrew/homebrew-cask#147305](https://github.com/Homebrew/homebrew-cask/issues/147305). Hence, enabling `--require-sha` with any of the above casks installed will lead to this error:[^6]

```text
...
==> Verifying checksum for '89947a18e10d5bbda8e2b5d15a60b6823353f019ea1a4b74e3d9c4f91248776e--chromium.rb'
==> Checking cask has checksum
Error: Cask 'chromium' does not have a sha256 checksum defined and was not installed.
This means you have the --require-sha option set, perhaps in your HOMEBREW_CASK_OPTS.
/opt/homebrew/Library/Homebrew/cask/installer.rb:177:in `verify_has_sha'
...
```

Hopefully, in the future, a feature like pnpm's [`no-downgrade`](https://pnpm.io/settings#trustpolicy) could be added, where a cask cannot be installed if it now lacks a SHA-256 checksum when it had one previously. A feature such as the aforementioned request for a per-cask option could also prevent this issue.

For now, to quickly enable SHA-256 checksum verification for the casks in your Brewfile that have one available, run the following command:

```shell
brew info --cask --quiet --json=v2 $(brew bundle --global list --cask --quiet) | jq --raw-output '
  .casks[]
  | if .sha256 == "no_check" then
      "cask \"\(.token)\" # See Homebrew/homebrew-cask#147305"
    else
      "cask \"\(.token)\", args: { require_sha: true }"
    end
'
```

This will output the casks portion of the Brewfile (minus pinning, extra arguments, etc.) into `stdout` and enable `require_sha` only on the casks that have a SHA-256 checksum.

<!-- Footnotes -->

[^1]: https://docs.brew.sh/Manpage#:~:text=HOMEBREW%5FCASK%5FOPTS

[^2]: https://docs.brew.sh/Brew-Bundle-and-Brewfile#advanced-brewfiles

[^3]: https://docs.brew.sh/Homebrew-Security-and-Supply-Chain#casks-have-a-different-trust-model

[^4]: https://github.com/Homebrew/homebrew-cask/issues/147305#issuecomment-1550490475

[^5]: https://formulae.brew.sh/analytics/cask-install/365d/

[^6]: https://github.com/Homebrew/homebrew-cask/issues/147305
