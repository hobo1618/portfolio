import { useState, memo } from "react";
import tags from "data/json/tags.json";
import { v4 as uuidV4 } from "uuid";
import { useGalleryStore } from "store/galleryStore";
import { DoubleArrowButton, FilterButton, FavoriteButton } from "ui";
import CollapsibleTagsList from "components/CollapsibleTagsList";
import styles from "styles/Sidebar.module.css";
// import { Tag } from "ui/Tag";
interface SidebarProps extends SidebarVisibility {
  categories: string[];
}

interface SidebarVisibility {
  sidebarVisible: boolean;
  setSidebarVisible: (sidebarVisible: boolean ) => void;
}

interface SidebarBodyProps {
  categories: string[];
  tags: SidebarTag[];
}

interface SidebarTag {
  id: string;
  name: string;
  category: string;
}


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
    <div style={{ margin: "1rem", display: "flex", flexDirection: "row" }}>
      <h1 style={{ fontSize: "72px", color: "white", margin: "0" }}>SETTLA</h1>
      <FavoriteButton
        handleClick={handleClick}
        isFavorite={isSelected}
        size="100px"
      />
    </div>
  );
});

const SidebarIcon = ({ sidebarVisible, setSidebarVisible }: SidebarVisibility) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: sidebarVisible ? "25rem" : "0",
        zIndex: "3",
      }}
    >
      {sidebarVisible ? (
        <DoubleArrowButton
          handleClick={() => setSidebarVisible(!sidebarVisible)}
          direction="left"
          size="100px"
        />
      ) : (
        <FilterButton
          handleClick={() => setSidebarVisible(!sidebarVisible)}
          size="100px"
        />
      )}
    </div>
  );
};

const SidebarBody = memo(({ categories, tags }: SidebarBodyProps) => {
  return (
    <>
      <hr style={{ margin: 0 }} />
      {categories.map((category) => (
        <CollapsibleTagsList key={uuidV4()} tags={tags} category={category} />
      ))}
    </>
  );
});


/* eslint-disable react/display-name */
export default function Sidebar({
  sidebarVisible,
  setSidebarVisible,
  categories,
}: SidebarProps) {
  return (
    <>
      <div
        style={{
          flexBasis: sidebarVisible ? "25rem" : "0",
          transition: " width 1s ease-in-out",
          position: "sticky",
          height: "100vh",
          overflowY: "auto",
          top: "0",
          background: "black",
        }}
        className={styles.customScrollbar}
      >
        <SidebarHeader />
        <SidebarBody categories={categories} tags={tags} />
      </div>
      <SidebarIcon
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
    </>
  );
};
// Sidebar.displayName = 'Sidebar';

// export default Sidebar;
