import { memo, useState, useCallback } from "react";
import CollapsibleTagsList from "components/CollapsibleTagsList";
import { v4 as uuidV4 } from "uuid";
import styles from "styles/Sidebar.module.css";
import { FavoriteButton } from "ui";
import { useGalleryStore } from "store/galleryStore";

const SidebarHeader = memo(() => {
  const { filterFavoriteImages, resetFilteredImages } = useGalleryStore(
    (state) => state
  );
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
    !isSelected ? filterFavoriteImages() : resetFilteredImages();
  };
  return (
    <div style={{ margin: "1rem" }}>
      <h1 style={{ fontSize: "72px", color: "white", margin: "0" }}>SETTLA</h1>
      <FavoriteButton handleClick={handleClick} isFavorite={isSelected} />
    </div>
  );
});

export default memo(({ categories, tags }) => {
  return (
    <div
      style={{
        flexBasis: "25rem",
        position: "sticky",
        height: "100vh",
        overflowY: "auto",
        top: "0",
        background: "black",
      }}
      className={styles.customScrollbar}
    >
      <SidebarHeader />
      <hr style={{ margin: 0 }} />
      {categories.map((category) => (
        <CollapsibleTagsList key={uuidV4()} tags={tags} category={category} />
      ))}
    </div>
  );
});
