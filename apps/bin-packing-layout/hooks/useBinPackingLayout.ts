import { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import FirstFitInfiniteHeight from "algorithms/FirstFitInfiniteHeight";

const firstFitInfiniteHeight = (blocks, dimensions) => {
  // const packer = new FirstFitInfiniteHeight(dimensions.width);
  // packer.fit(blocks);
  // return blocks;

  const deepBlocks = cloneDeep(blocks);
  const packer = new FirstFitInfiniteHeight(dimensions.width);
  packer.fit(deepBlocks);
  return deepBlocks;
};

const getContainerDimensions = (ref) => {
  if (ref.current) {
    const { clientWidth: width, clientHeight: height } = ref.current;
    return {
      width,
      height,
    };
  }
};

const useBinPackingLayout = (blocks, containerRef) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [blocksToRender, setBlocksToRender] = useState(blocks);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setContainerDimensions(getContainerDimensions(containerRef));
      setLoaded(true);
    }

    window.addEventListener("resize", handleResize);

    setBlocksToRender(
      firstFitInfiniteHeight(blocks, containerDimensions)
    );

    function handleResize() {
      setContainerDimensions(getContainerDimensions(containerRef));
      setBlocksToRender(
      firstFitInfiniteHeight(blocks, containerDimensions)
      );
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [containerDimensions.width]);

  return [blocksToRender];
};

export default useBinPackingLayout;
