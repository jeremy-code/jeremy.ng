import { Heading, Link, Text } from "@/components/ui";

const NotFound = () => {
  return (
    <div>
      <Heading>Not Found</Heading>
      <Text>Could not find requested resource</Text>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
