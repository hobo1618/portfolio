import { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { createRandomRGB, createBins, getLeftPosition } from "helpers";
import Image from "next/image";
import Packer from "packer";
import cloneDeep from "lodash/cloneDeep";

const BinpackingLayout = ({ blocks }) => {
  const deepBlocks = cloneDeep(blocks);

  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [myPacker, setMyPacker] = useState(
    new Packer(containerDimensions.width, containerDimensions.height)
  );
  const [blocksToRender, setBlocksToRender] = useState(deepBlocks);
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!loaded) {
      setContainerDimensions(getContainerDimensions(containerRef));
      setLoaded(true);
    }

    function getContainerDimensions(ref) {
      if (ref.current) {
        const { clientWidth: width, clientHeight: height } = ref.current;
        return {
          width,
          height,
        };
      }
    }

    function handleResize() {
      setBlocksToRender(blocks);
      setContainerDimensions(getContainerDimensions(containerRef));
      setBlocksToRender(deepBlocks);
    }

    window.addEventListener("resize", handleResize);

    let packer = new Packer(containerDimensions.width, containerDimensions.height);
    packer.fit(blocksToRender);
    setBlocksToRender(blocksToRender);
    setMyPacker(packer);

    return () => window.removeEventListener("resize", handleResize);
  }, [containerDimensions]);

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

  const css = `
  .imageEffects {
    animation: fadeInAnimation ease-in 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
      filter: blur(5px);
      transform: scale(1.01)
    }
    10% {
      opacity: 0;
      filter: blur(2px);
      transform: scale(1.01)
    }
    100% {
      opacity: 1;
      filter: blur(0px)
      transform: scale(1)
    }
  }
  `;
  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        transform: "translateX(0) translateY(0px)",
      }}
    >
      <style>{css}</style>
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
                // border: "1px dotted gray",
              }}
            >
              <img
                className="imageEffects"
                style={{padding: "5px"}}
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
