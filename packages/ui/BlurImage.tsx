import Image from "next/image";
import { imageEffects } from "./BlurImage.module.css";

type BlurImageProps = {
  width: number;
  height: number;
  href: string;
};

const BlurImage = ({ width, height, href }: BlurImageProps) => {
  return (
    <Image
      width={width}
      height={height}
      src={`/assets/${href}`}
      className={imageEffects}
    />
  );
};

export { BlurImage };
