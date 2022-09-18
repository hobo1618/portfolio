import create from "zustand";
import objects from "data/json/items.json";
import compileTagsObject from "utils/compileTagsObject";
import { includesEvery, includesSome, advancedFilter } from "utils/filters";
import tags from "data/json/tags.json";

interface GalleryState {
  filterTags: string[];
}

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
        includesEvery
      );
      return { filteredImages: newFilteredImages };
    }),
  // filter tags
  tags: tags,
  filterTags: [],
  tagsObject: compileTagsObject(tags, objects),
  logState: () =>
    set((state) => {
      console.log(state);
      return state;
    }),
  updateTagsObject: (tags, filteredImages) => {
    set(() => {
      const newTagsObject = compileTagsObject(tags, filteredImages);
      return { tagsObject: newTagsObject };
    });
  },
  addFilterTag: (tagId) =>
    set((state) => {
      // console.log(state);
      let filterTags2 = [...state.filterTags];
      filterTags2.push(tagId);
      state.filterImages(filterTags2, objects);
      // const newTagsObject = compileTagsObject(tags, state.filteredImages);
      return { filterTags: filterTags2 };
    }),
  removeFilterTag: (tagId) =>
    set((state) => {
      let filterTags2 = [...state.filterTags];
      let result = filterTags2.filter((id) => id != tagId);
      state.filterImages(result, objects);
      // const newTagsObject = compileTagsObject(tags, state.filteredImages);
      return { filterTags: result };
    }),
}));
