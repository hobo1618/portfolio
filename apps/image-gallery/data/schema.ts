interface Tag {
  id: string;
  name: Names;
  description?: string;
  category: Categories;
}
type Tags = Array<Tag>;

type Categories = "style" | "space" | "purpose";
type Names =
  | "japandi"
  | "mid-century-modern"
  | "art deco"
  | "provence"
  | "storage"
  | "outdoor"
  | "office"
  | "living room"
  | "kitchen"
  | "kids"
  | "hallway"
  | "dining"
  | "bedroom"
  | "bathroom"
  | "Walls"
  | "Textiles"
  | "Tableware"
  | "Tables"
  | "Storage"
  | "Seating"
  | "Lighting"
  | "Flooring"
  | "Electronics"
  | "Bed"
  | "Art"
  | any;


interface Object {
  id: string;
  href: string;
  width: number;
  height: number;
  tags: Array<string>;
}

type Objects = Array<Object>;
