import type { ComponentPropsWithRef } from "react";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const { Root: Collapsible, Trigger: CollapsibleTrigger } = CollapsiblePrimitive;

type CollapsibleProps = ComponentPropsWithRef<typeof Collapsible>;

type CollapsibleTriggerProps = ComponentPropsWithRef<typeof CollapsibleTrigger>;

type CollapsibleContentProps = ComponentPropsWithRef<
  typeof CollapsiblePrimitive.Panel
>;

const CollapsibleContent = (props: CollapsibleContentProps) => {
  return (
    <CollapsiblePrimitive.Panel
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "h-(--collapsible-panel-height) overflow-y-hidden ease-out data-ending-style:h-0 data-starting-style:h-0 motion-safe:transition-[height]",
          className,
        ),
      )}
    />
  );
};

export {
  Collapsible,
  type CollapsibleProps,
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
  CollapsibleContent,
  type CollapsibleContentProps,
};
