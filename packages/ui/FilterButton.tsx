interface FilterButtonProps {
  handleClick: () => void;
  size: string;
}
export const FilterButton = ({ handleClick, size }: FilterButtonProps) => {
  return (
    <button onClick={() => handleClick()}>
      <svg viewBox="0 0 50 50" width={size} height={size}>
          <path fill="#000" 
            d="M22 40q-.85 0-1.425-.575Q20 38.85 20 38V26L8.05 10.75q-.7-.85-.2-1.8Q8.35 8 9.4 8h29.2q1.05 0 1.55.95t-.2 1.8L28 26v12q0 .85-.575 1.425Q26.85 40 26 40Zm2-13.8L36 11H12Zm0 0Z"
          />
      </svg>
    </button>
  );
};