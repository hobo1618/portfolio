import { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import FirstFitInfiniteHeight from "algorithms/FirstFitInfiniteHeight";
import { debounce } from "lodash";
const firstFitInfiniteHeight = (blocks, width) => {
  const deepBlocks = cloneDeep(blocks);
  const packer = new FirstFitInfiniteHeight(width);
  packer.fit(deepBlocks);
  return { orderedBlocks: deepBlocks, height: packer.height };
};

const getContainerDimensions = (ref) => {
  if (ref.current) return ref.current.clientWidth;
};

const useBinPackingLayout = (blocks, containerRef) => {
  const [blocksToRender, setBlocksToRender] = useState(blocks);
  const [loaded, setLoaded] = useState(false);
  // width is computed based on window event listener and ref
  const [containerWidth, setContainerWidth] = useState(0);
  // height is computed after the algorithm runs
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!loaded) {
      setContainerWidth(getContainerDimensions(containerRef));
      setLoaded(true);
    }

    // pack blocks and get height
    const { orderedBlocks, height } = firstFitInfiniteHeight(
      blocks,
      containerWidth
    );
    setBlocksToRender(orderedBlocks);
    setContainerHeight(height);

    const debouncedHandleResize = debounce(function handleResize() {
      setContainerWidth(getContainerDimensions(containerRef));
      // repack blocks and get height
      const { orderedBlocks, height } = firstFitInfiniteHeight(
        blocks,
        containerWidth
      );
      setBlocksToRender(orderedBlocks);
      setContainerHeight(height);
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [containerWidth]);

  return [blocksToRender, containerHeight];
};

export default useBinPackingLayout;
