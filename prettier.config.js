/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  plugins: [require.resolve("@ianvs/prettier-plugin-sort-imports")],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(actions|app|assets|components|hooks|lib)/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
};
