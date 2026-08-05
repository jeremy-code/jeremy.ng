import { Heading, type HeadingProps } from "@jeremyng/ui/components/Heading";
import { Link } from "@jeremyng/ui/components/Link";

type MarkdownHeadingProps = {
  id: string;
} & HeadingProps;

const MarkdownH1 = ({ children, ...props }: MarkdownHeadingProps) => {
  return (
    <Heading as="h1" size="4xl" {...props}>
      <Link variant="anchor" href={`#${props.id}`}>
        {children}
      </Link>
    </Heading>
  );
};

const MarkdownH2 = ({ children, ...props }: MarkdownHeadingProps) => {
  return (
    <Heading as="h2" size="3xl" {...props}>
      <Link variant="anchor" href={`#${props.id}`}>
        {children}
      </Link>
    </Heading>
  );
};

const MarkdownH3 = ({ children, ...props }: MarkdownHeadingProps) => {
  return (
    <Heading as="h3" size="2xl" {...props}>
      <Link variant="anchor" href={`#${props.id}`}>
        {children}
      </Link>
    </Heading>
  );
};

const MarkdownH4 = ({ children, ...props }: MarkdownHeadingProps) => {
  return (
    <Heading as="h4" size="xl" {...props}>
      <Link variant="anchor" href={`#${props.id}`}>
        {children}
      </Link>
    </Heading>
  );
};

const MarkdownH5 = ({ children, ...props }: MarkdownHeadingProps) => {
  return (
    <Heading as="h5" size="lg" {...props}>
      <Link variant="anchor" href={`#${props.id}`}>
        {children}
      </Link>
    </Heading>
  );
};

const MarkdownH6 = ({ children, ...props }: MarkdownHeadingProps) => {
  return (
    <Heading as="h6" size="md" {...props}>
      <Link variant="anchor" href={`#${props.id}`}>
        {children}
      </Link>
    </Heading>
  );
};

export {
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
};
