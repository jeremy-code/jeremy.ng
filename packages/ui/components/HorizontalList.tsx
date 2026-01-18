import type { ComponentPropsWithRef } from "react";

const HorizontalList = (props: ComponentPropsWithRef<"ul">) => {
  return <ul className="inline-block list-none" {...props} />;
};

const HorizontalListItem = (props: ComponentPropsWithRef<"li">) => {
  return (
    <li
      className="inline not-last:after:font-black not-last:after:content-['\a0_·_']"
      {...props}
    />
  );
};

export { HorizontalList, HorizontalListItem };
