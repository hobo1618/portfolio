import type { NextPage } from "next";
import Image from "next/image";
import objects from "data/objects.json";

const ImagesTest: NextPage = () => {
  return (
    <div>
      <Image
        width={objects[0].width}
        height={objects[0].height}
        src={`/assets/${objects[0].href}`}
      />
    </div>
  );
};

export default ImagesTest;
