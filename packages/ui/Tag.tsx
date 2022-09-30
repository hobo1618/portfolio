import { useState } from "react";
type Props = {
  tag: Tag,
  name: string,
  action: (tag: object) => void;
  selected: boolean;
  active: boolean;
  selectedStyle?: object;
  unselectedStyle?: object;
  inactiveStyle?: object;
};
export interface Tag {
  id: string;
  name: string;
  category: string;
  selected?: boolean | undefined;
  active?: boolean | undefined;
}
const baseStyle = {
  borderRadius: "2rem",
  margin: "2px"
};

const defaultSelectedStyle = {
  color: "black",
  backgroundColor: "white",
  border: "2px solid white",
  padding: "0.5rem",
};

const defaultUnselectedStyle = {
  color: "white",
  border: "2px solid white",
  padding: "0.5rem",
};

const defaultInactiveStyle = {
  color: "gray",
  border: "1px solid gray",
  padding: "0.5rem",
  cursor: "auto",
};

const Tag = ({
  tag,
  name,
  action,
  selected,
  active,
  selectedStyle = defaultSelectedStyle,
  unselectedStyle = defaultUnselectedStyle,
  inactiveStyle = defaultInactiveStyle,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (active) {
      setIsActive(!isActive);
      action(tag);
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      style={
        !active
          ? { ...baseStyle, ...inactiveStyle }
          : selected
          ? { ...baseStyle, ...selectedStyle }
          : { ...baseStyle, ...unselectedStyle }
      }
    >
      {name}
    </button>
  );
};
export default Tag;
