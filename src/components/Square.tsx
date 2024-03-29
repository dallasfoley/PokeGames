const Square = ({
  info,
  isCorrect,
}: {
  info: string | number;
  isCorrect: boolean;
}) => {
  const className =
    isCorrect === true ? "square squarecorrect" : "square squareincorrect"; // Default class

  const capitalizeFirstLetter = (info: string | number) => {
    if (typeof info === "string") {
      return info.charAt(0).toUpperCase() + info.slice(1);
    }
    return info;
  };

  return <div className={className}>{capitalizeFirstLetter(info)}</div>;
};

export default Square;
