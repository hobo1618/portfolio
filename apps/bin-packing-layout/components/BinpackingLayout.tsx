import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import Image from "next/image";
import useBinPackingLayout from "hooks/useBinPackingLayout";

const BinpackingLayout = ({ blocks }) => {
  const containerRef = useRef(null);
  const [blocksToRender] = useBinPackingLayout(
    blocks,
    containerRef,
    "firstFitInfiniteHeight",
    null
  );

  interface Bin {
    width: number;
    height: number;
    boxes: Block[];
  }

  interface Block {
    width: number;
    height: number;
    href: string;
    id: number;
    x: number;
    y: number;
  }

  interface Boxes extends Array<Block> {}

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
    40% {
      opacity: .1;
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
        height: "0vh",
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
                padding: '5px',
              }}
                className="imageEffects"
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
