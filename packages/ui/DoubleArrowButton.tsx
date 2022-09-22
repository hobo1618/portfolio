interface DoubleArrowButtonProps {
  handleClick: () => void;
  direction?: "right" | "left";
  size: string;
}
export const DoubleArrowButton = ({
  handleClick,
  direction,
  size,
}: DoubleArrowButtonProps) => {
  return (
    <button onClick={() => handleClick()}>
      <svg viewBox="0 0 50 50" width={size} height={size}>
        {direction == "left" ? (
          <path d="m22.65 35.95-12-12 12-12 2.1 2.1-9.9 9.9 9.9 9.9Zm12.65 0-12-12 12-12 2.1 2.1-9.9 9.9 9.9 9.9Z" />
        ) : (
          <path d="m12.75 35.95-2.1-2.1 9.9-9.9-9.9-9.9 2.1-2.1 12 12Zm12.65 0-2.1-2.1 9.9-9.9-9.9-9.9 2.1-2.1 12 12Z" />
        )}
      </svg>
    </button>
  );
};
