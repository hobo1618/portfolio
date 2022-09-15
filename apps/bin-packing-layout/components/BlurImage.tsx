import Image from "next/image";

const BlurImage = ({ width, height, href }) => {
  const css = `
  .imageEffects {
    animation: fadeInAnimation ease-in 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
      filter: blur(20px);
      transform: scale(1.1)
    }
    10% {
      opacity: 0;
      filter: blur(4px);
      transform: scale(1.1)
    }
    40% {
      opacity: .1;
      filter: blur(2px);
      transform: scale(1.05)
    }
    100% {
      opacity: 1;
      filter: blur(0px)
      transform: scale(1)
    }
  }
  `;
  return (
    <>
      <style>{css}</style>
      <Image
        width={width}
        height={height}
        src={`/assets/${href}`}
        className="imageEffects"
      />
    </>
  );
};

export default BlurImage