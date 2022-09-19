export const includesEvery = (filteredArr, filterArr) => {
  const filteredSet = new Set(filteredArr)
  return filterArr.every((item) => filteredSet.has(item))
};

export const includesSome = (filteredArr, filterArr) => {
  const filteredSet = new Set(filteredArr)
  return filterArr.some((item) => filteredSet.has(item))
};

export const keepItemByOrWithinAndBetween = (filteredArr, filterObj) => {
  let keep = true;
  Object.keys(filterObj).map((key) => {
    if (filterObj[key].length == 0) return;
    if (!includesSome(filteredArr, filterObj[key])) return (keep = false);
  });
  return keep;
};

export const advancedFilter = (array, property, filterArr, filterFunction) => {
  const filteredArr = array.filter((item) =>
    filterFunction(item[property], filterArr)
  );
  return filteredArr;
};



// export const includesEvery = (filteredArr, filterArr) => {
//   return filterArr.every((item) => filteredArr.includes(item))
// };

// export const includesSome = (filteredArr, filterArr) => {
//   return filterArr.some((item) => filteredArr.includes(item))
// };

// export const advancedFilter = (array, property, filterArr, filterFunction) => {
//   const filteredArr = array.filter((item) =>
//     filterFunction(item[property], filterArr)
//   );
//   return filteredArr;
// };