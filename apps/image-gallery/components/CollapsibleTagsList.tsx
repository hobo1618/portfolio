import { useState, memo } from "react";
import { PlusMinusButton, TagsList } from "ui";
import { useGalleryStore } from "store/galleryStore";
import styles from "styles/CollapsibleTagsList.module.css";
import shallow from "zustand/shallow";

const CollapsibleTagsList = memo(({ tags, category }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addFilterTag, removeFilterTag, setImageArrOnAllTags } =
    useGalleryStore((state) => state);

  const filterTags = useGalleryStore((state) => state.filterTags, shallow);

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
          background: "rgba(255,0,0,0)",
        }}
      >
        <h1 style={{ color: "white" }}>{category}</h1>
        <PlusMinusButton
          handleClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      </div>
      <div
        style={{
          margin: "0 1rem 0 1rem",
          height: isOpen ? "auto" : "0px",
          maxHeight: "10rem",
          overflowY: "auto",
          visibility: isOpen ? "visible" : "hidden",
        }}
        className={styles.customScrollbars__content}
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
});
export default CollapsibleTagsList;
