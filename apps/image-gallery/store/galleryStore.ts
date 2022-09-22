import create from "zustand";
import objects from "data/json/items.json";
import categories from "data/json/categories.json";
import { compileFilterTags, compileTags } from "utils/compilers";
import { keepItemByOrWithinAndBetween, advancedFilter } from "utils/filters";
import tags from "data/json/tags.json";

interface Image {
  id: string;
  itemTags: string[];
  href: string;
  width: number;
  height: number;
  name?: string,
}

interface Tag {
  id: string;
  name: string;
  category: string;
  selected?: boolean;
  // images: string[];
}

interface Favorites {
  [key: string]: boolean;
}

interface FilterTags {
  [key: string]: string[]
}

interface GalleryState {
  images: Image[];
  favorites: Favorites;
  filteredImages: Image[];
  tags: Tag[];
  filterTags: FilterTags;
  filterImages: (tags: FilterTags, images: Image[]) => void;
  filterFavoriteImages: () => void;
  resetFilteredImages: () => void;
  setTagStatus: (id: string, selected: boolean) => void;
  toggleTagStatus: (id: string) => void;
  setImageArrOnAllTags: (id: string, category: string) => void;
  addFilterTag: (tagId: string, category: string) => void;
  removeFilterTag: (tagId: string, category: string) => void;
  toggleFavorite: (id: string) => void;

}

export const useGalleryStore = create<GalleryState>((set) => ({
  images: objects,
  favorites: {},
  filteredImages: objects,
  tags: compileTags(tags, objects),
  filterTags: compileFilterTags(categories),
  filterImages: (tags, images) =>
    set((state) => {
      console.log(tags);
      
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
      let newTags = compileTags(tags, newFilteredImages, category);
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
      console.log(filterTags2);
      
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
