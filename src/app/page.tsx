"use client";

import { submitContact } from "@/actions/contact/submitContact";
import { Captcha, SubmitButton } from "@/components/form";
import { Footer, Navbar } from "@/components/layout";
import { Button, Input, Textarea } from "@/components/ui";
import { css, cx } from "@/lib/styled/css";
import { container } from "@/lib/styled/patterns";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className={cx(container(), css({ py: { base: 4, md: 6, lg: 8 } }))}>
        <h1>Home</h1>
        <p>Welcome to the Home page</p>
        <Button>Click me!</Button>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu varius
          massa. Donec ultrices posuere nisl, a pellentesque nunc imperdiet in.
          Suspendisse sit amet lacus nunc. Nulla nec imperdiet risus, quis
          maximus ex. Vestibulum interdum eu magna et fringilla. Suspendisse at
          nulla sagittis, varius ipsum sed, volutpat ante. Vestibulum tortor
          tellus, luctus in diam id, gravida congue tellus. Integer auctor
          euismod nulla, et volutpat purus condimentum in. In vel lobortis
          dolor. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Quisque dignissim mi eros, nec venenatis magna
          convallis accumsan. Morbi posuere convallis ipsum vitae malesuada.
        </p>
        <form
          action={submitContact}
          // using setTimeout() so FormData is not reset before action request
          // is sent to server
          onSubmit={() => setTimeout(turnstile.reset)}
        >
          <Input name="name" type="text" placeholder="X Æ A-12 Musk" />
          <Input
            name="email"
            type="email"
            placeholder="saul.goodman@bettercallsaul.com"
          />
          <Textarea name="message" placeholder="Hello, World!" />
          <Captcha />
          <SubmitButton>Submit</SubmitButton>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Home;
