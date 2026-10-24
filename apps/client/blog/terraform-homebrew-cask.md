---
title: Why Terraform is not available on Homebrew
lede: Why Terraform fails licensing requirements for Homebrew's core repository
authors:
  - name: Jeremy Nguyen
tags:
  - homebrew
  - open-source
  - terraform
mastodonId: "117493965024335268"
publishedDate: "2026-10-24T04:20:43Z"
---

> **tl;dr**: Terraform isn't allowed as a formula in the Homebrew repository because it's no longer open source after changing its license to Business Source License v1.1.

As of August 4, 2026, the most popular non-core Homebrew formula is Terraform from the tap [`hashicorp/tap`](https://github.com/hashicorp/homebrew-tap) with 338,969 (0.12%) formula install requests annually, taking the place of the 195th most installed formula.[^1]

Though, to be precise, to say the Terraform CLI is not available in the Homebrew core repository is not entirely accurate: for macOS versions Sequoia to Monterey, you can still install [terraform v1.5.7](https://github.com/Homebrew/homebrew-core/blob/15-sequoia/Formula/t/terraform.rb), which was last released in [September 2023](https://github.com/hashicorp/terraform/releases/tag/v1.5.7) (nearly three years old at the time of writing).

If you review the [source code](https://github.com/Homebrew/homebrew-core/blob/f42c4a659e4da887fc714f8f41cc26794a4bb320/Formula/t/terraform.rb#L42-L46) for this version of Terraform, it also identifies the reason for the deprecation:[^2]

```
We will not accept any new Terraform releases in homebrew/core (with the BUSL license).
The next release changed to a non-open-source license:
https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license
See our documentation for acceptable licences:
  https://docs.brew.sh/License-Guidelines
```

As a quick aside, here is some terminology used by Homebrew to be familiar with:[^3]

| Term    | Definition                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------ |
| Formula | Package definition to build binaries to install                                                  |
| Cask    | Package definition that installs pre-compiled binaries                                           |
| Tap     | Third-Party Repositories in addition to the default `homebrew/core` that host formulae and casks |

`homebrew/core`, the default repository in Homebrew, does _not_ allow non-open-source formulae.[^4] This restriction may be surprising to some Homebrew users given proprietary software can be installed with it, such as [Spotify](https://formulae.brew.sh/cask/spotify) and [Adobe Creative Cloud](https://formulae.brew.sh/cask/adobe-creative-cloud), but those are casks, not formulae.

## Background

As the aforementioned notice cites, on August 10, 2023, the CTO of HashiCorp announced in a blog post that they were switching the license for their Terraform code from Mozilla Public License v2.0 (MPL 2.0) to the Business Source License (BSL or BUSL) v1.1.[^5]

According to Homebrew's license guidelines:

> Formulae in `homebrew/core` must use a licence compatible with the [Debian Free Software Guidelines](https://wiki.debian.org/DFSGLicenses) or be released into the public domain under the [DFSG public-domain guidance](https://wiki.debian.org/DFSGLicenses#Public_Domain).[^4]

Of the guidelines in the [Debian Free Software Guidelines](https://www.debian.org/social_contract#guidelines), the one that I imagine that Terraform's license specifically violates is:

> 4. No Discrimination Against Fields of Endeavor
>    The license must not restrict anyone from making use of the program in a specific field of endeavor. For example, it may not restrict the program from being used in a business, or from being used for genetic research.[^6]

Terraform's implementation of BSL has an additional use grant forbidding "competitive offerings" of the work.

> You may make production use of the Licensed Work, provided Your use does not include offering the Licensed Work to third parties on a hosted or embedded basis in order to compete with IBM Corp.'s paid version(s) of the Licensed Work.

As MariaDB, the creators of the license, themselves point out: "The Business Source License (this document, or the 'License') is not an Open Source license."[^7]

As another aside, this tap was not created by HashiCorp specifically in response to their license change. The tap has existed [since 2020](https://github.com/hashicorp/homebrew-tap/commit/a825e6cae20107375ddfd132451e62871e00926f), including up to 2022, in which [it was licensed under the MPLv2](https://github.com/hashicorp/homebrew-tap/blob/9209303525471ca16c963f5cf7be570ba11b30ea/LICENSE). The tap had also already hosted [Terraform](https://github.com/hashicorp/homebrew-tap/blob/9209303525471ca16c963f5cf7be570ba11b30ea/Formula/terraform.rb) in addition to other formulae.

## Can Terraform be a cask?

Another meaningful question that can be raised is: if Terraform can't be a formula, why can't it be a cask? As mentioned previously, casks, unlike formulae, do not necessarily need to be open-source. In fact, Terraform was already a cask on Homebrew, up until 2016 when it was moved to `homebrew-core` to be a formula.[^8]

The original [terraform.rb](https://github.com/Homebrew/homebrew-cask/blob/837bac4b6ca01247056daaeef6913b62e4851182/Casks/terraform.rb) file from that period of time could theoretically still function as a cask definition. As of time of the writing, the binaries are still being published at the same location: https://releases.hashicorp.com/terraform/1.15.8/. In fact, the Terraform tap actually uses that same URL for its formula: https://github.com/hashicorp/homebrew-tap/blob/master/Formula/terraform.rb.

In fact, two BUSL-licensed HashiCorp packages, [vagrant](https://github.com/Homebrew/homebrew-cask/blob/12528d32dc887e94d7bf381cee58f91c83d8dcc5/Casks/v/vagrant.rb) ([LICENSE](https://github.com/hashicorp/vagrant/blob/main/LICENSE)) and [consul](https://github.com/Homebrew/homebrew-cask/blob/12528d32dc887e94d7bf381cee58f91c83d8dcc5/Casks/c/consul.rb) ([license](https://github.com/hashicorp/consul/blob/main/LICENSE)), are published in `Homebrew/homebrew-cask` today. While `vagrant` is published as a `.dmg` file, `consul` is published as a `.zip` similar to Terraform.

Hence, it seems that if someone wanted to, they could probably open a pull request to `Homebrew/homebrew-cask` for a Terraform cask definition and also get it accepted.

### Are Homebrew default casks preferred over third-party taps?

| Package                         | Type    | Place | Annual install events    |
| ------------------------------- | ------- | ----- | ------------------------ |
| vagrant                         | cask    | 197   | 18,844                   |
| hashicorp/tap/hashicorp-vagrant | cask    | 318   | 9,943                    |
| hashicorp/tap/consul            | formula | 1798  | 6,005 (6,001 on request) |
| consul                          | cask    | 768   | 2,981                    |

However, an interesting observation arises from this. Reviewing the data, it seems that the Homebrew default cask for `vagrant` outpaces its HashiCorp counterpart, while the inverse is true for `consul`. If I had to guess, the reason for this disparity is that users of Terraform are more likely to be `consul` users, and hence, since they already use the HashiCorp tap, they also gravitate to its `consul` formula.

Note that HashiCorp recommends installing Vagrant and Consul on macOS via their own tap as opposed to via the Homebrew core repository.[^9]

## Conclusion

Terraform actually has an open-source fork licensed under the MPL v2.0 known as OpenTofu.[^10] OpenTofu is available as a formula on Homebrew core, but it is ranked in 479th place with 86,580 installations (0.03%), a 72.576% decrease compared to its source-available counterpart.

In short, Terraform isn't available as a formula since, despite being source-available, its license does not adhere to standards that would qualify it as open-source. While Terraform is not currently available as a default cask on Homebrew, from what I can tell, there's nothing stopping it from being made available as one. I'm curious what would happen if someone were to open a pull request to make it available there, though I suspect HashiCorp will still nonetheless direct users to their own third-party repository.

[^1]: https://formulae.brew.sh/analytics/install/365d/

[^2]: https://github.com/Homebrew/homebrew-core/blob/f42c4a659e4da887fc714f8f41cc26794a4bb320/Formula/t/terraform.rb#L42-L46

[^3]: https://docs.brew.sh/Formula-Cookbook#homebrew-terminology, https://docs.brew.sh/Bottles, https://docs.brew.sh/Taps

[^4]: https://docs.brew.sh/Licence-Guidelines

[^5]: https://www.hashicorp.com/en/blog/hashicorp-adopts-business-source-license

[^6]: https://www.debian.org/social_contract#guidelines

[^7]: https://mariadb.com/bsl11/

[^8]: https://github.com/Homebrew/homebrew-cask/pull/23585

[^9]: https://developer.hashicorp.com/vagrant/install, https://developer.hashicorp.com/consul/install

[^10]: https://www.linuxfoundation.org/press/announcing-opentofu
