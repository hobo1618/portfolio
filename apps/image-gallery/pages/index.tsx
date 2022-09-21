import { useState, useCallback } from "react";
import type { NextPage } from "next";
import shallow from "zustand/shallow";
import tags from "data/json/tags.json";
import categories from "data/json/categories.json";
import { v4 as uuidV4 } from "uuid";
import createSets from "utils/createSets";
import { useGalleryStore } from "store/galleryStore";
import {
  BlurImage,
  BinpackingLayout,
  FavoriteButton,
  DoubleArrowButton,
  FilterButton,
} from "ui";
import Sidebar from "components/Sidebar";
import styles from "styles/Sidebar.module.css";

const HoverOverlay = (props) => {
  const { toggleFavorite } = useGalleryStore((state) => state);

  const favorite = useGalleryStore(
    useCallback((state) => state.favorites[props.id], [props.id]),
    shallow
  );

  const handleClick = () => {
    toggleFavorite(props.id);
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <BlurImage {...props} />
      {isHovering && (
        <div
          style={{
            position: "absolute",
            // padding: "5px",
            zIndex: 2,
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FavoriteButton
            handleClick={() => handleClick()}
            isFavorite={favorite}
            size="200px"
          />
        </div>
      )}
    </div>
  );
};

const Home: NextPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const filteredImages = useGalleryStore(
    (state) => state.filteredImages,
    shallow
  );
  // const tags = useGalleryStore((state) => state.tags, shallow);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        overflowX: "clip",
      }}
    >
      <div
        style={{
          flexBasis: sidebarVisible ? "25rem" : "0",
          position: "sticky",
          // offset: sidebarVisible ? "auto" : "25rem 0",
          height: "100vh",
          overflowY: "auto",
          top: "0",
          background: "black",
        }}
        className={styles.customScrollbar}
      >
        <Sidebar categories={categories} tags={tags} />
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 4,
          flexDirection: "column",
          position: "relative",
        }}
      >
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

        {createSets(filteredImages, 5).map((set) => (
          <BinpackingLayout
            key={uuidV4()}
            blocks={set}
            Component={HoverOverlay}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
