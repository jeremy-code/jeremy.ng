const { cwd } = require("node:process");
const { relative } = require("node:path");

/** @type {import('lint-staged').Config} */
module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) =>
    `next lint --fix --file ${filenames.map((f) => relative(cwd(), f)).join(" --file ")}`,
};
