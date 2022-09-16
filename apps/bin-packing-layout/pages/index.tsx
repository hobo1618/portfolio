import type { NextPage } from "next";
import objects from "data/objects.json";
import BinpackingLayout from "components/BinpackingLayout";
import { BlurImage } from "ui";

const Home: NextPage = () => {
  const totalImages = objects.length;
  const imagesPerBin = 20;
  const fullBins = Math.floor(totalImages / imagesPerBin);
  const remainingImages = totalImages - fullBins * imagesPerBin;
  let totalBins = remainingImages != 0 ? fullBins : fullBins + 1;
  let sets = new Array(totalBins);
  for (let i = 0; i < sets.length; i++) {
    sets[i] = objects.slice(i * imagesPerBin, (i + 1) * imagesPerBin);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "fit-content",
        background: "pink",
        paddingLeft: "4rem",
        paddingRight: "4rem",
      }}
    >
      <h1>HEY YOU!!</h1>
      {sets.map((set) => (
        <BinpackingLayout blocks={set} Component={BlurImage} />
      ))}
      <h1>HEY YOU!!</h1>
    </div>
  );
};

export default Home;
