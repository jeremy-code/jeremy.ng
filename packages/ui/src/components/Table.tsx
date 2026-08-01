import type { ComponentPropsWithRef } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

const TableScrollArea = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn(
        "block max-w-full overflow-auto whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
};

const tableVariants = tv({
  base: "group/table w-full border-collapse text-start align-top lining-nums tabular-nums",
  variants: {
    variant: {
      line: "[&>*>tr]:border-b",
      outline:
        "ring ring-border [&>*>tr]:not-last:border-b [&>tbody>tr]:first:border-t [&>tfoot>tr]:border-t",
    },
    size: {
      sm: "text-sm/5 [--table-padding-x:--spacing(2)] [--table-padding-y:--spacing(2)]",
      md: "text-sm/5 [--table-padding-x:--spacing(3)] [--table-padding-y:--spacing(3)]",
      lg: "text-md/6 [--table-padding-x:--spacing(4)] [--table-padding-y:--spacing(3)]",
    },
    interactive: { true: null, false: null },
    stickyHeader: {
      true: "[&>thead>tr]:sticky [&>thead>tr]:top-0 [&>thead>tr]:z-1",
      false: null,
    },
    striped: { true: null, false: null },
    showColumnBorder: { true: null, false: null },
  },
  defaultVariants: {
    variant: "line",
    size: "sm",
  },
});

type TableProps = ComponentPropsWithRef<"table"> &
  VariantProps<typeof tableVariants>;

const Table = ({
  className,
  variant,
  size,
  interactive,
  stickyHeader,
  striped,
  showColumnBorder,
  ...props
}: TableProps) => {
  return (
    <table
      data-variant={variant}
      data-interactive={interactive}
      data-striped={striped}
      data-show-column-border={showColumnBorder}
      className={tableVariants({
        className,
        variant,
        size,
        stickyHeader,
        striped,
        showColumnBorder,
        interactive,
      })}
      {...props}
    />
  );
};

const TableBody = ({ className, ...props }: ComponentPropsWithRef<"tbody">) => {
  return <tbody className={cn("table-row-group", className)} {...props} />;
};

const TableCell = ({ className, ...props }: ComponentPropsWithRef<"td">) => {
  return (
    <td
      className={cn(
        "items-center border-border px-(--table-padding-x) py-(--table-padding-y) text-start",
        "group-data-[show-column-border=true]/table:not-last:border-r",
        className,
      )}
      {...props}
    />
  );
};

const TableFooter = ({
  className,
  ...props
}: ComponentPropsWithRef<"tfoot">) => {
  return (
    <tfoot
      className={cn("table-footer-group font-medium", className)}
      {...props}
    />
  );
};

const TableHeader = ({ className, ...props }: ComponentPropsWithRef<"th">) => {
  return (
    <th
      className={cn(
        "border-border px-(--table-padding-x) py-(--table-padding-y) text-start font-bold text-foreground",
        "group-data-[show-column-border=true]/table:not-last:border-r",
        className,
      )}
      {...props}
    />
  );
};

const TableHead = ({ className, ...props }: ComponentPropsWithRef<"thead">) => {
  return (
    <thead
      className={cn(
        "table-header-group",
        "group-data-[variant=outline]/table:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

const TableRow = ({ className, ...props }: ComponentPropsWithRef<"tr">) => {
  return (
    <tr
      className={cn(
        "table-row border-border",
        "group-data-[striped=true]/table:odd:[&>td]:bg-muted",
        "group-data-[interactive=true]/table:not-disabled:hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

const tableCaptionVariants = tv({
  base: "table-caption, text-xs/4 font-medium",
  variants: {
    side: {
      top: "mb-1 caption-top",
      bottom: "mt-1 caption-bottom",
    },
  },
});

type TableCaptionProps = ComponentPropsWithRef<"caption"> &
  VariantProps<typeof tableCaptionVariants>;

const TableCaption = ({ className, side, ...props }: TableCaptionProps) => {
  return (
    <caption
      className={tableCaptionVariants({
        className,
        side,
      })}
      {...props}
    />
  );
};

export {
  TableScrollArea,
  Table,
  type TableProps,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
  type TableCaptionProps,
};
