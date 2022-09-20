import { useState } from "react";
import { PlusMinusButton, TagsList } from "ui";
import { useGalleryStore } from "store/galleryStore";

const CollapsibleTagsList = ({ tags, category }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { addFilterTag, removeFilterTag, filterTags, setImageArrOnAllTags } =
    useGalleryStore((state) => state);

  const handleTagClick = ({ id, category }) => {
    filterTags[category].includes(id)
      ? removeFilterTag(id, category)
      : addFilterTag(id, category);

    setImageArrOnAllTags(id, category);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 1rem 0 1rem",
        }}
      >
        <h1 style={{ color: "white" }}>{category}</h1>
        <PlusMinusButton handleClick={handleClick} isOpen={isOpen} />
      </div>
      <div
        style={{
          margin: "0 1rem 0 1rem",
          height: isOpen ? "auto" : "0px",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <TagsList
          tags={tags}
          category={category}
          handleTagClick={handleTagClick}
        />
      </div>
      <hr style={{ marginTop: "10px", width: "100%" }} />
    </div>
  );
};
export default CollapsibleTagsList;
