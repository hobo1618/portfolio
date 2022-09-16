import { v4 as uuid } from "uuid";
//filesystem
import * as fs from "fs";
import * as path from "path";
//types
import { Tag, Tags, TagsStructure } from "data/types";
//data
import styles from "data/json/styles.json"
import purposes from "data/json/purposes.json"
import spaces from "data/json/spaces.json"
import items from "data/json/items.json"

let tags: Tags = [];

const categories: TagsStructure = {
  style: styles,
  purpose: purposes,
  space: spaces,
  item: items,
};

Object.keys(categories).map((key) =>
  categories[key].map((name) => {
    const tag: Tag = {
      id: uuid(),
      name,
      category: categories[key],
    };
    tags.push(tag);
  })
);

console.log(tags);

export default tags;
