import { useState, useCallback } from "react";
import type { NextPage } from "next";
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
    useCallback((state) => {
      return state.images[
        state.images.findIndex((image) => image.id == props.id)
      ].favorite;
    },[])
  );

  console.log(favorite);

  // const Component = props.Component
  const [isHovering, setIsHovering] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(props.favorite);
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
            handleClick={() => toggleFavorite(props.id, props.favorite)}
            isFavorite={favorite}
          />
        </div>
      )}
    </div>
  );
};

const Home: NextPage = () => {
  const { filteredImages } = useGalleryStore((state) => state);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        overflowX: "clip",
        // maxHeight: "100vh",
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
        {/* <BinpackingLayout blocks={filteredImages} Component={BlurImage} /> */}
        {createSets(filteredImages, 5).map((set) => (
          <BinpackingLayout
            key={uuidV4()}
            blocks={set}
            Component={HoverOverlay}
          />
          // <BinpackingLayout key={uuidV4()} blocks={set} Component={BlurImage} />
        ))}
      </div>
    </div>
  );
};

export default Home;
