import { useState } from "react";
type Props = {};

const defaultSelectedStyle = {
  color: "black",
  backgroundColor: "white",
  border: "2px solid white",
  borderRadius: "2rem",
  padding: "0.5rem",
};

const defaultUnselectedStyle = {
  color: "white",
  border: "2px solid white",
  borderRadius: "2rem",
  padding: "0.5rem",
};

const defaultInactiveStyle = {
  color: "black",
  border: "2px solid gray",
  borderRadius: "2rem",
  padding: "0.5rem",
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
    setIsActive(!isActive);
    action(tag);
  };

  return (
    <button
      onClick={() => handleClick()}
      style={
        !active
          ? { ...inactiveStyle }
          : selected
          ?  {...selectedStyle }
          : { ...unselectedStyle }
      }
    >
      {name}
    </button>
  );
};
export default Tag;
