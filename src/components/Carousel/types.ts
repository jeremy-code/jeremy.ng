export type CarouselItemData = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
  links: {
    url: string;
    code: string;
  };
};
