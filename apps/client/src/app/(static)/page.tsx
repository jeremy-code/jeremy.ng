import { GithubPinnedList } from "#components/github/GithubPinnedList";
import { NpmSearchList } from "#components/npm/NpmSearchList";
import { Heading } from "@jeremyng/ui/components/Heading";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <Heading as="h1" size="2xl" className="mb-4">
          NPM Libraries
        </Heading>
        <NpmSearchList />
      </section>
      <section>
        <Heading as="h1" size="2xl" className="mb-4">
          GitHub Repositories
        </Heading>
        <GithubPinnedList />
      </section>
    </div>
  );
};

export default Home;
