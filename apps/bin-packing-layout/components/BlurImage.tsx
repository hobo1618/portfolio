import Image from "next/image";
import styles from "components/BlurImage.module.css";

const BlurImage = ({ width, height, href }) => {
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
