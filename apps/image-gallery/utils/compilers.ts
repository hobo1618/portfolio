export const compileTagsObject = (tags, images) => {
  let tagsObject = {};
  tags.map((tag) =>
    images.map((image) => {
      if (image.itemTags.includes(tag.id)) {
        if (!tagsObject[tag.id]) {
          tagsObject[tag.id] = [];
        }
        tagsObject[tag.id].push(image.id);
      }
    })
  );
  return tagsObject
};

export const compileFilterTags = (categories) => {
  let filterTags = {};
  categories.map((category) => (filterTags[category] = []));
  return filterTags
};