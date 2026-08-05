import type { ComponentPropsWithRef } from "react";

import {
  Blockquote,
  BlockquoteContent,
} from "@jeremyng/ui/components/Blockquote";

const MarkdownBlockquote = (props: ComponentPropsWithRef<"blockquote">) => {
  return (
    <Blockquote>
      <BlockquoteContent {...props} />
    </Blockquote>
  );
};

export { MarkdownBlockquote };
