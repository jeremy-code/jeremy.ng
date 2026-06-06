import { createContext, use, type ComponentPropsWithRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

const dataListVariants = tv({
  slots: {
    base: "group/data-list wrap-anywhere",
    item: null,
    itemLabel: "text-fg-muted flex items-start",
    itemValue: "text-fg flex min-w-0 flex-1",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "grid grid-cols-[auto_1fr]",
        item: "col-[span_2] grid grid-cols-subgrid items-baseline gap-[inherit]",
      },
      vertical: {
        base: "flex flex-col",
        item: "flex flex-col gap-1",
      },
    },
    size: {
      sm: {
        base: "gap-3",
        item: "text-xs/4",
      },
      md: {
        base: "gap-4",
        item: "text-sm/5",
      },
      lg: {
        base: "gap-5",
        item: "text-md/6",
      },
    },
    variant: {
      subtle: null,
      bold: {
        itemLabel: "font-medium",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
    variant: "subtle",
  },
});

const DataListContext = createContext<ReturnType<
  typeof dataListVariants
> | null>(null);

const useDataListContext = () => {
  const context = use(DataListContext);
  if (context === null) {
    throw new Error("useDataListContext must be used within a DataList");
  }
  return context;
};

type DataListProps = ComponentPropsWithRef<"dl"> &
  VariantProps<typeof dataListVariants>;

const DataList = ({
  className,
  orientation,
  size,
  variant,
  ...props
}: DataListProps) => {
  const computedDataListVariants = dataListVariants({
    orientation,
    size,
    variant,
  });

  return (
    <DataListContext value={computedDataListVariants}>
      <dl className={computedDataListVariants.base({ className })} {...props} />
    </DataListContext>
  );
};

type DataListItemProps = ComponentPropsWithRef<"div">;

const DataListItem = ({ className, ...props }: DataListItemProps) => {
  const { item } = useDataListContext();

  return <div className={item({ className })} {...props} />;
};

type DataListItemLabelProps = ComponentPropsWithRef<"dt">;

const DataListItemLabel = ({ className, ...props }: DataListItemLabelProps) => {
  const { itemLabel } = useDataListContext();

  return <dt className={itemLabel({ className })} {...props} />;
};

type DataListItemValueProps = ComponentPropsWithRef<"dd">;

const DataListItemValue = ({ className, ...props }: DataListItemValueProps) => {
  const { itemValue } = useDataListContext();

  return <dd className={itemValue({ className })} {...props} />;
};

export {
  dataListVariants,
  DataListContext,
  useDataListContext,
  DataList,
  type DataListProps,
  DataListItem,
  type DataListItemProps,
  DataListItemLabel,
  type DataListItemLabelProps,
  DataListItemValue,
  type DataListItemValueProps,
};
