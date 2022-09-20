import { takeRight } from "lodash";

export const compileTagsObject = (tags, images, categories) => {
  let tagsObject = {};
  categories.map((category) => {
    if (!tagsObject[category]) tagsObject[category] = {};
    tags.map((tag) =>
      images.map((image) => {
        if (image.itemTags.includes(tag.id)) {
          if (!tagsObject[category][tag.id]) {
            tagsObject[category][tag.id] = [];
          }
          tagsObject[category][tag.id].push(image.id);
        }
      })
    );
  });

  return tagsObject;
};

export const compileFilterTags = (categories) => {
  let filterTags = {};
  categories.map((category) => (filterTags[category] = []));
  return filterTags;
};

export const compileTags = (tags, images, category?) => {
  return tags.map((tag) => {
    if (!tag.selected) {
      tag.selected = false;
    }
    if (!tag.active) {
      tag.active = true;
    }

    tag.images = [];
    images.map((image) => {
      if (image.itemTags.includes(tag.id)) {
        tag.images.push(tag.id);
      }
    });
    // tag.images.length > 0 ? (tag.active = true) : (tag.active = false);
    tag.images.length > 0 || tag.category == category
      ? (tag.active = true)
      : (tag.active = false);
    return tag;
  });
};
