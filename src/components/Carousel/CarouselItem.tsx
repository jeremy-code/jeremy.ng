import { Image } from "@chakra-ui/next-js";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Divider,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { CarouselItemData } from "@/components/Carousel";
import { Icon } from "@/components/Misc";

type CarouselItemProps = CarouselItemData & CardProps;

const CarouselItem = ({ title, description, image, tags, links, ...props }: CarouselItemProps) => {
  return (
    <Card minW="20rem" variant={useColorModeValue("outline", "filled")} {...props}>
      <CardBody>
        <Image src={image.src} alt={image.alt} width={200} height={200} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Flex gap={2}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Flex>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
      <Divider color={useColorModeValue("gray.300", "gray.600")} />
      <CardFooter>
        <ButtonGroup spacing="2">
          <a href={links.url} target="_blank" rel="noopener noreferrer">
            <Button leftIcon={<Icon name="link" />} variant="solid">
              View
            </Button>
          </a>
          <a href={links.code} target="_blank" rel="noopener noreferrer">
            <Button leftIcon={<Icon name="code" />} variant="ghost">
              Code
            </Button>
          </a>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CarouselItem;
