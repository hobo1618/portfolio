import { useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import useBinPackingLayout from "hooks/useBinPackingLayout";

const BinpackingLayout = ({ blocks, Component }) => {
  const containerRef = useRef(null);
  const [blocksToRender] = useBinPackingLayout(blocks, containerRef);

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

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "0vh",
        transform: "translateX(0) translateY(0px)",
      }}
    >
      {blocksToRender.map((block) => {
        if (block.fit)
          return (
            <div
              key={uuidV4()}
              style={{
                position: "absolute",
                left: `${block.fit.x}px`,
                width: `${block.width}px`,
                top: `${block.fit.y}px`,
                height: `${block.height}px`,
                padding: "5px",
              }}
            >
              <Component {...block} />
            </div>
          );
      })}
    </div>
  );
};

export default BinpackingLayout;
