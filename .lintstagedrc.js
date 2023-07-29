const path = require("path");

/** @type {import('lint-staged').Config} */
module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => {
    return `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(" --file ")}`;
  },
};
