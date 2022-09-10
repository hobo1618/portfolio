import type { NextPage } from "next";
import objects from "data/objects.json";
import BinpackingLayout from "components/BinpackingLayout";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        marginTop: "3rem",
        paddingLeft: "4rem",
        paddingRight: "4rem",
      }}
    >
      <BinpackingLayout
        blocks={objects}
      />
    </div>
  );
};

export default Home;
