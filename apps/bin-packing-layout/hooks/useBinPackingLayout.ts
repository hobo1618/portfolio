import { useState, useEffect } from "react";
import Packer from "packer";
import cloneDeep from "lodash/cloneDeep";

const customAlgorithm = (blocks, algorithm) => {
  const blocksToRender = algorithm(blocks);
  return [blocksToRender];
};

const firstFitDecreasing = (blocks, dimensions) => {
  const packer = new Packer(dimensions.width, dimensions.height);
  packer.fit(blocks);
  return blocks;
};

const useBinPackingAlgorithm = (blocks, binDimensions, type, userAlgorithm) => {
  const deepBlocks = cloneDeep(blocks);

  switch (type) {
    case "firstFitDecreasing":
      console.log("use firstFitDecreasing");
      return firstFitDecreasing(deepBlocks, binDimensions);
    case "bestFit":
      console.log("use bestFitDecreasing");
    case "custom":
      console.log("use custom");
      return customAlgorithm(deepBlocks, userAlgorithm);
    default:
      console.log("use firstFitDecreasing");
      return firstFitDecreasing(deepBlocks, binDimensions);
  }
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

const useBinPackingLayout = (blocks, containerRef, type, userAlgorithm) => {
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
      useBinPackingAlgorithm(blocks, containerDimensions, type, userAlgorithm)
    );

    function handleResize() {
      setContainerDimensions(getContainerDimensions(containerRef));
      setBlocksToRender(
        useBinPackingAlgorithm(blocks, containerDimensions, type, userAlgorithm)
      );
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [containerDimensions, blocks]);

  return [blocksToRender];
};

export default useBinPackingLayout;
