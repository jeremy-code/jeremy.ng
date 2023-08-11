import * as projectsAssets from "@/assets/projects";

export type CarouselItemData = {
  title: string;
  description: string;
  image: {
    src: keyof typeof projectsAssets;
    alt: string;
  };
  tags: string[];
  links: {
    url: string;
    code: string;
  };
};
