export const includesEvery = (filteredArr, filterArr) => {
  return filterArr.every((item) => filteredArr.includes(item))
};

export const includesSome = (filteredArr, filterArr) => {
  return filterArr.some((item) => filteredArr.includes(item))
};

export const advancedFilter = (array, property, filterArr, filterFunction) => {
  const filteredArr = array.filter((item) =>
    filterFunction(item[property], filterArr)
  );
  return filteredArr;
};