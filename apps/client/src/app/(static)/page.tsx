import { ContactForm } from "#components/contact/ContactForm";
import { GithubPinnedListContainer } from "#components/github/GithubPinnedListContainer";
import { NpmSearchList } from "#components/npm/NpmSearchList";
import { Heading } from "@jeremyng/ui/components/Heading";
import { Link } from "@jeremyng/ui/components/Link";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <Heading
          id="npm-libraries"
          as="h1"
          size="2xl"
          className="mb-2 leading-loose"
        >
          <Link variant="anchor" href="#npm-libraries">
            NPM Libraries
          </Link>
        </Heading>
        <NpmSearchList />
      </section>
      <section>
        <Heading
          id="github-repositories"
          as="h1"
          size="2xl"
          className="mb-2 leading-loose"
        >
          <Link variant="anchor" href="#github-repositories">
            GitHub Repositories
          </Link>
        </Heading>
        <GithubPinnedListContainer />
      </section>
      <section>
        <Heading id="contact" as="h1" size="2xl" className="mb-2 leading-loose">
          <Link variant="anchor" href="#contact">
            Contact
          </Link>
        </Heading>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <article>
            <Heading
              id="message"
              as="h2"
              size="xl"
              className="mb-2 leading-loose"
            >
              <Link variant="anchor" href="#message">
                Send a message
              </Link>
            </Heading>
            <ContactForm />
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
