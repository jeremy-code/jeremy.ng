import Image from "next/image";
import { ImageResponse } from "next/server";

import { logo } from "@/assets";

export const generateImageMetadata = () => {
  return [
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "small",
    },
    {
      contentType: "image/png",
      size: { width: 72, height: 72 },
      id: "medium",
    },
    {
      contentType: "image/png",
      size: { width: 96, height: 96 },
      id: "large",
    },
    {
      contentType: "image/png",
      size: { width: 144, height: 144 },
      id: "xlarge",
    },
  ];
};

const Icon = () => {
  return new ImageResponse(<Image src={logo} width={1000} height={1000} alt="Jeremy logo" />);
};

export default Icon;
