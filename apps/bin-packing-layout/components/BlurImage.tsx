import Image from "next/image";
import styles from "components/BlurImage.module.css";

interface BlurImageProps {
  width: number;
  height: number;
  href: string;
}

const BlurImage = ({ width, height, href }:BlurImageProps) => {
  return (
    <Image
      width={width}
      height={height}
      src={`/assets/${href}`}
      className={styles.imageEffects}
    />
  );
};

export default BlurImage;
