import { forwardRef } from "react";
import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  variant?: "container";
} & BoxProps;

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, children, variant, ...props }, ref) => {
    const styles = useStyleConfig("Section", { variant });

    return (
      <Box id={id} data-scrollspy data-nav-title={id} {...props} ref={ref} __css={styles}>
        {children}
      </Box>
    );
  }
);

Section.displayName = "Section";

export default Section;
