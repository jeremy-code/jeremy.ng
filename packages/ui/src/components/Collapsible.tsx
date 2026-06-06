import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { cn } from "tailwind-variants";

const { Root: Collapsible, Trigger: CollapsibleTrigger } = CollapsiblePrimitive;

const CollapsibleContent = ({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      {...props}
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-collapsible-down",
        "data-[state=closed]:animate-collapsible-up",
        props.className,
      )}
    />
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
