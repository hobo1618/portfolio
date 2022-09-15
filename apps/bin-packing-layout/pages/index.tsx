import type { NextPage } from "next";
import objects from "data/objects.json";
import BinpackingLayout from "components/BinpackingLayout";
import BlurImage from "components/BlurImage";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: "pink",
        paddingLeft: "4rem",
        paddingRight: "4rem",
      }}
    >
      <BinpackingLayout
        blocks={objects}
        Component={BlurImage}
      />
    </div>
  );
};

export default Home;
