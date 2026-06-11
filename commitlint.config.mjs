/** @import { UserConfig } from "@commitlint/types" */

import { RuleConfigSeverity } from "@commitlint/types";

/**
 * @satisfies {UserConfig}
 */
const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      // From https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    "scope-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["client", "api", "eslint-config", "tsconfig", "ui"],
    ],
  },
};

export default commitlintConfig;
