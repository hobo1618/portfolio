import { useState, useCallback } from "react";
import shallow from "zustand/shallow";
import { useGalleryStore } from "store/galleryStore";
import {
  BlurImage,
  FavoriteButton,
} from "ui";
type HoverOverlayProps = {
  id: string;
  width: number;
  height: number;
  href: string;
};
const HoverOverlay = (props: HoverOverlayProps) => {
  const { toggleFavorite } = useGalleryStore((state) => state);

  const favorite = useGalleryStore(
    useCallback((state) => state.favorites[props.id], [props.id]),
    shallow
  );

  const handleClick = () => {
    toggleFavorite(props.id);
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <BlurImage {...props} />
      {isHovering && (
        <div
          style={{
            position: "absolute",
            // padding: "5px",
            zIndex: 2,
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FavoriteButton
            handleClick={() => handleClick()}
            isFavorite={favorite}
            size="200px"
          />
        </div>
      )}
    </div>
  );
};

export default HoverOverlay;