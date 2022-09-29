import { useState } from "react";
import type { NextPage } from "next";
import shallow from "zustand/shallow";
import categories from "data/json/categories.json";
import { v4 as uuidV4 } from "uuid";
import createSets from "utils/createSets";
import { useGalleryStore } from "store/galleryStore";
import { BinpackingLayout } from "ui";
import Sidebar from "components/Sidebar";
import HoverOverlay from "components/HoverOverlay";

const Home: NextPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const filteredImages = useGalleryStore(
    (state) => state.filteredImages,
    shallow
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        overflowX: "clip",
      }}
    >
      <Sidebar
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
        categories={categories}
      />
      <div
        style={{
          display: "flex",
          flexGrow: 4,
          // width: "100%",
          flexDirection: "column",
          position: "relative",
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
