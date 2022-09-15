import { useRef, ElementType } from "react";
import { v4 as uuidV4 } from "uuid";
import useBinPackingLayout from "hooks/useBinPackingLayout";

interface ComponentProps {
  blocks: Array<Block>;
  Component: ElementType<Block>;
};

interface Block {
  width: number;
  height: number;
  fit?: {
    x: number;
    y: number;
  };
}

const BinpackingLayout = ({ blocks, Component }: ComponentProps) => {
  const containerRef = useRef(null);
  const [blocksToRender, containerHeight] = useBinPackingLayout(
    blocks,
    containerRef
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: `${containerHeight}px`,
        position: "relative",
      }}
    >
      {blocksToRender.map((block: Block) => {
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
