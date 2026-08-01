import type { MarkdownToJSX } from "markdown-to-jsx/react";

import { MarkdownBlockquote } from "./MarkdownBlockquote";
import {
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
} from "./MarkdownHeading";
import { MarkdownLink } from "./MarkdownLink";
import { MarkdownOl, MarkdownUl } from "./MarkdownList";
import {
  MarkdownTable,
  MarkdownTableBody,
  MarkdownTableCell,
  MarkdownTableFooter,
  MarkdownTableHead,
  MarkdownTableHeader,
  MarkdownTableRow,
} from "./MarkdownTable";

const MARKDOWN_OVERRIDES = {
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  h4: MarkdownH4,
  h5: MarkdownH5,
  h6: MarkdownH6,
  p: "p",
  blockquote: MarkdownBlockquote,
  a: MarkdownLink,
  ul: MarkdownUl,
  ol: MarkdownOl,
  table: MarkdownTable,
  tr: MarkdownTableRow,
  th: MarkdownTableHeader,
  thead: MarkdownTableHead,
  tfoot: MarkdownTableFooter,
  tbody: MarkdownTableBody,
  td: MarkdownTableCell,
} satisfies MarkdownToJSX.Overrides;

export { MARKDOWN_OVERRIDES };
