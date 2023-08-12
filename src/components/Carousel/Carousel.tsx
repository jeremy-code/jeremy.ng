import { CarouselItem, CarouselItemData, ContentSlider } from "@/components/Carousel";

const Carousel = ({ data }: { data: CarouselItemData[] }) => {
  return (
    <ContentSlider>
      {data.map((item) => (
        <CarouselItem {...item} key={item.title} />
      ))}
    </ContentSlider>
  );
};

export default Carousel;
