import { Box } from "@chakra-ui/react";

import { CarouselItem, CarouselItemData, ContentSlider } from "@/components/Carousel";

const Carousel = ({ data }: { data: CarouselItemData[] }) => {
  return (
    <Box w="full" overflowX="hidden">
      <ContentSlider>
        {data.map((item) => (
          <CarouselItem {...item} key={item.title} />
        ))}
      </ContentSlider>
    </Box>
  );
};

export default Carousel;
