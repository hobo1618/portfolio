import { memo } from "react";
import CollapsibleTagsList from "components/CollapsibleTagsList";
import { v4 as uuidV4 } from "uuid";

export default memo(({ categories, tags }) => {
  return (
    <div
      style={{
        flexBasis: "25rem",
        position: "sticky",
        height: "100vh",
        maxHeight: "100vh",
        overflowY: "hidden",
        top: "0",
        background: "black",
      }}
    >
      <div style={{ margin: "1rem" }}>
        <h1 style={{ fontSize: "72px", color: "white", margin: "0" }}>
          SETTLA
        </h1>
      </div>
      <hr style={{ margin: 0 }} />
      {categories.map((category) => (
        <CollapsibleTagsList key={uuidV4()} tags={tags} category={category} />
      ))}
    </div>
  );
});