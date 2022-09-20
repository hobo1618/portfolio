import Tag from "./Tag";

export const TagsList = ({ tags, category, handleTagClick }) => {
  return (
    <>
      {tags.map((tag) => {
        return (
          tag.category == category && (
            <Tag
              key={tag.id}
              tag={tag}
              name={tag.name}
              selected={tag.selected}
              active={tag.active}
              action={handleTagClick}
            />
          )
        );
      })}
    </>
  );
};