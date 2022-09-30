import Tag from "./Tag";
interface Props {
  handleTagClick: (args: any) => void;
  category: string;
  tags: Tag[];
}
// interface Tag {
//   id: string;
//   category: string;
//   selected: boolean;
//   active: boolean;
//   name: string;
// }
export const TagsList = ({ tags, category, handleTagClick }: Props) => {
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
