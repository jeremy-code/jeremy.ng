const { relative } = require("node:path");

/** @type {import('lint-staged').Config} */
module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) =>
    `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(" --file ")}`,
};
