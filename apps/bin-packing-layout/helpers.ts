export const createRandomRGB = () => {
  const max = 255;
  let r = Math.floor(Math.random() * max);
  let g = Math.floor(Math.random() * max);
  let b = Math.floor(Math.random() * max);
  return `rgba(${r},${g},${b},0.2)`;
};

export function getBinWidthRatio(index: number) {
  let widthRatio;

  index % 4 == 1 || index % 4 == 2
    ? (widthRatio = 2 / 3)
    : (widthRatio = 1 / 3);
  return widthRatio;
}

interface WindowDims {
  width: number;
  height: number;
}

interface BinConstructor {
  new (width: number, height: number): object;
}

export function createBins(
  binCount: number,
  Bin: BinConstructor,
  windowDims: WindowDims
) {
  let bins = [];

  for (let index = 0; index < binCount; index++) {
    bins.push(
      new Bin(windowDims.width * getBinWidthRatio(index), windowDims.height)
    );
  }
  return bins;
}

export const getLeftPosition = (index: number, windowWidth: number) => {
  // if the index is even, the left position is 0.
  // if the index is odd, the left position is either 1/3 of 2/3 from the left
  return index % 2 == 0
    ? 0
    : index % 4 == 1
    ? (1 / 3) * windowWidth
    : (2 / 3) * windowWidth;
};
