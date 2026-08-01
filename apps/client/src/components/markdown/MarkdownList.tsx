import type { ComponentPropsWithRef } from "react";

const MarkdownUl = (props: ComponentPropsWithRef<"ul">) => {
  return <ul {...props} className="ms-6 list-disc" />;
};

const MarkdownOl = (props: ComponentPropsWithRef<"ol">) => {
  return <ol {...props} className="ms-6 list-decimal" />;
};

export { MarkdownUl, MarkdownOl };
