import { useEffect, useState } from "react";
import Tag from "components/Tag";
import compileTagsObject from "utils/compileTagsObject";
import { useGalleryStore } from "store/galleryStore";

const CollapsibleTagsList = ({ tags, category }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const {
    addFilterTag,
    removeFilterTag,
    filterTags,
    logState,
    filteredImages,
    updateTagsObject,
    tagsObject,
  } = useGalleryStore((state) => state);

  const handleTagClick = ({ id, category }) => {
    filterTags[category].includes(id)
      ? removeFilterTag(id, category)
      : addFilterTag(id, category);
  };

  useEffect(() => {
    updateTagsObject(tags, filteredImages);
    logState();
  }, [filteredImages]);

  const handleTagStatus = ({ id, category }) => {
    return !tagsObject[id]
      ? "inactive"
      : filterTags[category] && filterTags[category].includes(id)
      ? "selected"
      : "unselected";
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 1rem 0 1rem",
          }}
        >
          <h1 style={{ color: "white" }}>{category}</h1>
          <button onClick={() => handleClick()}>
            <svg viewBox="0 0 50 50" width="50px" height="50px">
              {isOpen ? (
                <path fill="#FFF" d="M10 25.5v-3h28v3Z" />
              ) : (
                <path
                  fill="#FFF"
                  d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          style={{
            margin: "0 1rem 0 1rem",
            height: isOpen ? "auto" : "0px",
            visibility: isOpen ? "visible" : "hidden",
          }}
        >
          {tags.map((tag) => {
            if (tag.category == category)
              return (
                <Tag
                  key={tag.id}
                  tag={tag}
                  name={tag.name}
                  status={handleTagStatus(tag)}
                  action={handleTagClick}
                />
              );
          })}
        </div>
        <hr style={{ marginTop: "10px", width: "100%" }} />
      </div>
    </div>
  );
};
export default CollapsibleTagsList;
