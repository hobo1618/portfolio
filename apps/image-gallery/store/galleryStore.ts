import create from "zustand";
import objects from "data/json/items.json";
import categories from "data/json/categories.json";
import { compileTagsObject, compileFilterTags } from "utils/compilers";
import {
  includesEvery,
  includesSome,
  keepItemByOrWithinAndBetween,
  advancedFilter,
} from "utils/filters";
import tags from "data/json/tags.json";

export const useGalleryStore = create<GalleryState>((set) => ({
  // images
  images: objects,
  filteredImages: objects,
  filterImages: (tags, images) =>
    set((state) => {
      let newFilteredImages = [...state.images];
      newFilteredImages = advancedFilter(
        images,
        "itemTags",
        tags,
        keepItemByOrWithinAndBetween
      );
      return { filteredImages: newFilteredImages };
    }),
  // filter tags
  tags: tags,
  filterTags: compileFilterTags(categories),
  tagsObject: compileTagsObject(tags, objects),
  logState: () =>
    set((state) => {
      console.log(state);
      return state;
    }),
  updateTagsObject: (tags, filteredImages) => {
    set((state) => {
      const newTagsObject = compileTagsObject(tags, filteredImages);
      state.logState()
      
      return { tagsObject: newTagsObject };
    });
  },
  addFilterTag: (tagId, category) =>
    set((state) => {
      // console.log(state);
      let filterTags2 = { ...state.filterTags };
      filterTags2[category].push(tagId);
      // filterTags2.push(tagId);
      state.filterImages(filterTags2, objects);
      // const newTagsObject = compileTagsObject(tags, state.filteredImages);
      return { filterTags: filterTags2 };
    }),
  removeFilterTag: (tagId, category) =>
    set((state) => {
      let filterTags2 = { ...state.filterTags };
      let result = filterTags2[category].filter((id) => id != tagId);
      filterTags2[category] = result;
      console.log(filterTags2);
      state.filterImages(filterTags2, objects);
      // const newTagsObject = compileTagsObject(tags, state.filteredImages);

      return { filterTags: filterTags2 };
    }),
}));
