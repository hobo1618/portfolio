export default (tags, images) => {
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