import type { NextPage } from "next";
import Image from "next/image";
import Packer from "packer";
// import GrowingPacker from "algorithms/FirstFitInfiniteHeight";
import GrowingPacker from "packer";
import objects from "data/objects.json";

// let blocks = [
//   { width: 300, height: 300, playdo: "sadwich" },
//   { width: 100, height: 300 },
//   { width: 100, height: 100 },
//   { width: 80, height: 80 },
//   { width: 70, height: 80 },
//   { width: 10, height: 90 },
//   { width: 80, height: 80 },
//   { width: 100, height: 80 },
//   { width: 500, height: 70 },
//   { width: 80, height: 80 },
//   { width: 80, height: 80 },
//   { width: 80, height: 80 },
// ];
let blocks = [
  { w: 300, h: 300, playdo: "sadwich" },
  { w: 100, h: 300 },
  { w: 100, h: 100 },
  { w: 80, h: 80 },
  { w: 70, h: 80 },
  { w: 10, h: 90 },
  { w: 80, h: 80 },
  { w: 100, h: 80 },
  { w: 500, h: 70 },
  { w: 80, h: 80 },
  { w: 80, h: 80 },
  { w: 80, h: 80 },
];
const Test: NextPage = () => {
  const packer = new GrowingPacker();
  blocks.sort(function(a,b) { return (b.h < a.h); })
  packer.fit(blocks);
  console.log(blocks);
  
  return (
    <div style={{ width: "500px", background: "blue", height: "500px" }}>
      {blocks.map((block) => {
        if (block.fit) {
          return (
            <div
              style={{
                position: "absolute",
                left: `${block.fit.x}px`,
                width: `${block.w}px`,
                top: `${block.fit.y}px`,
                height: `${block.h}px`,
                border: "1px dotted gray",
              }}
            ></div>
          );
        }
      })}
      {/* <Image
        w={objects[0].width}
        h={objects[0].h}
        src={`/assets/${objects[0].href}`}
      /> */}
    </div>
  );
};

export default Test;
