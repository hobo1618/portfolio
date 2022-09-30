import Image from "next/image";
import styles from "./BlurImage.module.css";

type BlurImageProps = {
  width: number;
  height: number;
  href: string;
  description?: string;
};

const BlurImage = ({ description, width, height, href }: BlurImageProps) => {
  return (
    <Image
      alt={description || ""}
      width={width}
      height={height}
      src={`/assets/${href}`}
      className={styles.imageEffects}
    />
  );
};

export { BlurImage };
