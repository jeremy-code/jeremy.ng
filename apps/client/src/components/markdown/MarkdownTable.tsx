import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "@jeremyng/ui/components/Table";

const MarkdownTable = (props: TableProps) => {
  return <Table variant="outline" showColumnBorder {...props} />;
};

export {
  MarkdownTable,
  TableBody as MarkdownTableBody,
  TableCell as MarkdownTableCell,
  TableFooter as MarkdownTableFooter,
  TableHead as MarkdownTableHead,
  TableHeader as MarkdownTableHeader,
  TableRow as MarkdownTableRow,
};
