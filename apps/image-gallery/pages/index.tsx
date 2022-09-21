import type { NextPage } from "next";
import tags from "data/json/tags.json";
import { v4 as uuidV4 } from "uuid";
import createSets from "utils/createSets";
import { useGalleryStore } from "store/galleryStore";
import { BlurImage, BinpackingLayout } from "ui";
import Sidebar from "components/Sidebar";

const categories = ["style", "space", "purpose", "item"];

const Home: NextPage = () => {
  const { filteredImages } = useGalleryStore((state) => state);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        overflowX: "clip" 
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
          <BinpackingLayout key={uuidV4()} blocks={set} Component={BlurImage} />
        ))}
      </div>
    </div>
  );
};

export default Home;
