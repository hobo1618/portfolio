import type { NextPage } from "next";
import objects from "data/json/items.json";
import { v4 as uuidV4 } from "uuid";
import { BlurImage, BinpackingLayout } from "ui";
import tags from "data/tagsDataGenerator";

const Home: NextPage = () => {
  console.log(tags);
  
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
        <BinpackingLayout key={uuidV4()} blocks={set} Component={BlurImage} />
      ))}
      <h1>HEY YOU!!</h1>
    </div>
  );
};

export default Home;
