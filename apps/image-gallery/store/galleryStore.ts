import create from "zustand";
import objects from "data/json/items.json";
import categories from "data/json/categories.json";
import { compileFilterTags, compileTags } from "utils/compilers";
import { keepItemByOrWithinAndBetween, advancedFilter } from "utils/filters";
import tags from "data/json/tags.json";

export const useGalleryStore = create<GalleryState>((set) => ({
  images: objects,
  favorites: {},
  filteredImages: objects,
  tags: compileTags(tags, objects),
  filterTags: compileFilterTags(categories),
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
  filterFavoriteImages: () => {
    set((state) => {
      // let newFilteredImages = [...state.images]
      // console.log(newFilteredImages);
      const newFilteredImages = state.images.filter(image => state.favorites[image.id])
      return { filteredImages: newFilteredImages }
    })
  },
  resetFilteredImages: () => {
    set((state) => ({
      ...state,
      filteredImages: state.images
    }))
  },
  logState: () =>
    set((state) => {
      console.log(state);

      return state;
    }),
  setTagStatus: (id, selected) => {
    set((state) => {
      let newTags = [...state.tags];
      const tagIndex = newTags.findIndex((tag) => tag.id == id);
      newTags[tagIndex].selected = selected;
      return { tags: newTags };
    });
  },
  toggleTagStatus: (id) => {
    set((state) => {
      let newTags = [...state.tags];
      const tagIndex = newTags.findIndex((tag) => tag.id == id);
      newTags[tagIndex].selected = !newTags[tagIndex].selected;
      return { tags: newTags };
    });
  },
  setImageArrOnAllTags: (id, category) => {
    set((state) => {
      let newFilteredImages = [...state.filteredImages];
      let newTags = compileTags(tags, newFilteredImages, category, id);
      state.toggleTagStatus(id);
      return { tags: newTags };
    });
  },
  addFilterTag: (tagId, category) =>
    set((state) => {
      let filterTags2 = { ...state.filterTags };
      filterTags2[category].push(tagId);
      state.filterImages(filterTags2, objects);
      return { filterTags: filterTags2 };
    }),
  removeFilterTag: (tagId, category) =>
    set((state) => {
      let filterTags2 = { ...state.filterTags };
      let result = filterTags2[category].filter((id) => id != tagId);
      filterTags2[category] = result;
      state.filterImages(filterTags2, objects);
      return { filterTags: filterTags2 };
    }),
  toggleFavorite: (id) =>
    set((state) => {
      let newFavorites = { ...state.favorites };
      newFavorites[id] = !newFavorites[id];
      return {
        favorites: newFavorites,
      };
    }),
}));
