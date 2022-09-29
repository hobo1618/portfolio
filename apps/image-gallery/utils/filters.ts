export const includesEvery = (filteredArr: [], filterArr: []) => {
  const filteredSet = new Set(filteredArr);
  return filterArr.every((item) => filteredSet.has(item));
};

export const includesSome = (filteredArr: [], filterArr: []) => {
  const filteredSet = new Set(filteredArr);
  return filterArr.some((item) => filteredSet.has(item));
};

export const keepItemByOrWithinAndBetween = (filteredArr: [], filter: any) => {
  let keep = true;
  if (Array.isArray(filter)) {
    filter.map((filterRow) => {
      if (filterRow.length == 0) return;
      if (!includesSome(filteredArr, filterRow)) return (keep = false);
    });
  } else {
    Object.keys(filter).map((key) => {
      let filterRow = filter[key];
      if (filterRow.length == 0) return;
      if (!includesSome(filteredArr, filterRow)) return (keep = false);
    });
    return keep;
  }
};

export const advancedFilter = (
  array: any[],
  property: string,
  filterArr: any,
  filterFunction: (arg: any, arg2: any) => void
) => {
  const filteredArr = array.filter((item) =>
    filterFunction(item[property], filterArr)
  );
  return filteredArr;
};
