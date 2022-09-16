export interface TagsStructure {
  style: Array<Style>;
  space: Array<Space>;
  itemType: Array<ItemType>;
  purpose: Array<Purpose>;
}

export type Categories = "style" | "space" | "purpose";
export type Style = string
export type Purpose = string
export type Space = string
export type ItemType = string;

export interface Tag {
  id: string;
  name: Style | ItemType | Purpose | Space;
  description?: string;
  category: Categories;
}

export type Tags = Array<Tag>;
