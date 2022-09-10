import { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { createRandomRGB, createBins, getLeftPosition } from "helpers";
import Image from "next/image";

const BinPacking2D = require("binpackingjs").BP2D;
const { Bin, Box, Packer } = BinPacking2D;

const BinpackingLayout = ({ rawBoxes }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [myPacker, setMyPacker] = useState(
    new Packer(createBins(0, Bin, windowDimensions))
  );

  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!loaded) {
      setWindowDimensions(getWindowDimensions(containerRef));
      setLoaded(true);
    }

    function getWindowDimensions(ref) {
      if (ref.current) {
        const { clientWidth: width, clientHeight: height } = ref.current;
        return {
          width,
          height,
        };
      }
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions(containerRef));
    }

    window.addEventListener("resize", handleResize);

    let boxes: Array<Boxes> = [];
    rawBoxes.map((rawBox, i) => {
      if (i < 100) {
        boxes.push(new Box(rawBox.width, rawBox.height));
        boxes[i]["href"] = rawBox.href;
        boxes[i]["id"] = rawBox.id;
      }
    });

    let packer = new Packer(createBins(10, Bin, windowDimensions));
    packer.pack(boxes);
    setMyPacker(packer);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  interface Bin {
    width: number;
    height: number;
    boxes: Box[];
  }

  interface Box {
    width: number;
    height: number;
    href: string;
    id: number;
    x: number;
    y: number;
  }

  interface Boxes extends Array<Box> {}

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        transform: "translateX(0) translateY(0px)",
      }}
    >
      {myPacker.bins.map((bin: Bin, i: number) => (
        <div
          key={uuidV4()}
          style={{
            background: createRandomRGB(),
            position: "absolute",
            width: `${bin.width}px`,
            height: `${bin.height}px`,
            top: `${Math.floor(i / 2) * bin.height}px`,
            left: `${getLeftPosition(i, windowDimensions.width)}px`,
          }}
        >
          {bin.boxes.map((box: Box) => (
            <div
              key={uuidV4()}
              style={{
                // background: "pink",
                // border: "1px dotted gray",
                padding: "10px",
                width: box.width,
                height: box.height,
                position: "absolute",
                left: `${box.x}px`,
                top: `${box.y}px`,
              }}
            >
              {/* <Image src={box.href} width={box.width} height={box.height} /> */}
              {/* <img src={box.href} /> */}
              <Image
                width={box.width}
                height={box.height}
                src={`/assets/${box.href}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default BinpackingLayout;
