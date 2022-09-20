export const compileFilterTags = (categories) => {
  let filterTags = {};
  categories.map((category) => (filterTags[category] = []));
  return filterTags;
};

export const compileTags = (tags, images, category?) => {
  return tags.map((tag) => {
    // runs on init
    if (!tag.selected) {
      tag.selected = false;
    }
    if (!tag.active === undefined) {
      tag.active = true;
    }

    tag.images = [];
    images.map((image) => {
      if (image.itemTags.includes(tag.id)) {
        tag.images.push(tag.id);
      }
    });

    // other test cases probably need to be fixed here
    if (tag.category != category) {
      tag.images.length > 0 ? (tag.active = true) : (tag.active = false);
    }

    return tag;
  });
};
