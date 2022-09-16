import type { NextPage } from "next";
import objects from "data/json/items.json";
import { v4 as uuidV4 } from "uuid";
import { BlurImage, BinpackingLayout } from "ui";
import createSets from "utils/createSets";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          flexBasis: "25rem",
          position: "sticky",
          maxHeight: "100vh",
          overflowY: "auto",
          top: "0",
          background: "black",
          border: "1px dotted pink",
        }}
      >
        <div
          style={{ position: "absolute", top: "0", right: "-50px", zIndex: "10" }}
        >
          hey
        </div>
        <h1 style={{ fontSize: "72px", color: "white", margin: "0" }}>settla</h1>
        <hr />
        <h1>style</h1>
        <hr />
        <h1>space</h1>
        <hr />
        <h1>type</h1>
        <hr />
        <h1>purpose</h1>
        <hr />
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 4,
          flexDirection: "column",
        }}
      >
        {createSets(objects, 5).map((set) => (
          <BinpackingLayout key={uuidV4()} blocks={set} Component={BlurImage} />
        ))}
      </div>
    </div>
  );
};

export default Home;
