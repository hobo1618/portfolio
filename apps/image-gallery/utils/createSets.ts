export default (items, itemsPerBin) => {
  const totalItems = items.length;
  const fullBins = Math.floor(totalItems / itemsPerBin);
  const remainingItems = totalItems - fullBins * itemsPerBin;
  let totalBins = remainingItems == 0 ? fullBins : fullBins + 1;
  let sets = new Array(totalBins);
  for (let i = 0; i < sets.length; i++) {
    sets[i] = items.slice(i * itemsPerBin, (i + 1) * itemsPerBin);
    console.log(sets[i]);
    
  }
  return sets;
};