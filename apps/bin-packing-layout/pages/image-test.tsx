import type { NextPage } from "next";
import Image from "next/image";
import Packer from "packer";
import objects from "data/objects.json";

let blocks = [
  { width: 300, height: 300, playdo: "sadwich" },
  { width: 100, height: 100 },
  { width: 100, height: 300 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
  { width: 80, height: 80 },
];

const ImagesTest: NextPage = () => {
  const packer = new Packer(500, 500);
  packer.fit(blocks);

  return (
    <div style={{ width: "500px", background: "blue", height: "500px" }}>
      {blocks.map((block) => {
        if (block.fit) {
          return (
            <div
              style={{
                position: "absolute",
                left: `${block.fit.x}px`,
                width: `${block.width}px`,
                top: `${block.fit.y}px`,
                height: `${block.height}px`,
                border: "1px dotted gray",
              }}
            ></div>
          );
        }
      })}
      {/* <Image
        width={objects[0].width}
        height={objects[0].height}
        src={`/assets/${objects[0].href}`}
      /> */}
    </div>
  );
};

export default ImagesTest;
