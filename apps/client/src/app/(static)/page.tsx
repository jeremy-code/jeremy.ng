import { NpmSearchList } from "#components/npm/NpmSearchList";
import { Heading } from "@jeremyng/ui/components/Heading";

const Home = () => {
  return (
    <>
      <Heading as="h1" size="2xl" className="mb-4">
        NPM Libraries
      </Heading>
      <NpmSearchList />
    </>
  );
};

export default Home;
