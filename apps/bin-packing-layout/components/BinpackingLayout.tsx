import { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { createRandomRGB, createBins, getLeftPosition } from "helpers";
import Image from "next/image";
import Packer from "packer";
import cloneDeep from "lodash/cloneDeep";

const BinpackingLayout = ({ blocks }) => {
  const deepBlocks = cloneDeep(blocks);

  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [myPacker, setMyPacker] = useState(
    new Packer(windowDimensions.width, windowDimensions.height)
  );
  const [blocksToRender, setBlocksToRender] = useState(deepBlocks);
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
      const timer = setTimeout(() => {
        setBlocksToRender(blocks);
        setWindowDimensions(getWindowDimensions(containerRef));
        setBlocksToRender(deepBlocks);
      }, 800);
      return () => clearTimeout(timer);
    }

    window.addEventListener("resize", handleResize);

    let packer = new Packer(windowDimensions.width, windowDimensions.height);
    packer.fit(blocksToRender);
    setBlocksToRender(blocksToRender);
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
      {blocksToRender.map((block) => {
        if (block.fit) {
          return (
            <div
              key={uuidV4()}
              style={{
                position: "absolute",
                left: `${block.fit.x}px`,
                width: `${block.width}px`,
                top: `${block.fit.y}px`,
                height: `${block.height}px`,
                border: "1px dotted gray",
              }}
            >
              <Image
                width={block.width}
                height={block.height}
                src={`/assets/${block.href}`}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default BinpackingLayout;
