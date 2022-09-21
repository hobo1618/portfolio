import { useState, useCallback } from "react";
import type { NextPage } from "next";
import shallow from "zustand/shallow";
import tags from "data/json/tags.json";
import categories from "data/json/categories.json";
import { v4 as uuidV4 } from "uuid";
import createSets from "utils/createSets";
import { useGalleryStore } from "store/galleryStore";
import { BlurImage, BinpackingLayout, FavoriteButton } from "ui";
import Sidebar from "components/Sidebar";

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
          />
        </div>
      )}
    </div>
  );
};

const Home: NextPage = () => {
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
      <Sidebar categories={categories} tags={tags} />
      <div
        style={{
          display: "flex",
          flexGrow: 4,
          flexDirection: "column",
        }}
      >
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
