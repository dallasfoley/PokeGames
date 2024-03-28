const Square = ({
  info,
  isCorrect,
}: {
  info: string | number;
  isCorrect: boolean;
}) => {
  let className = "square"; // Default class
  if (isCorrect === true) {
    className += " correct"; // Add 'correct' class if the guess is correct
  } else if (isCorrect === false) {
    className += " incorrect"; // Add 'incorrect' class if the guess is wrong
  }

  const capitalizeFirstLetter = (info: string | number) => {
    if (typeof info === "string") {
      return info.charAt(0).toUpperCase() + info.slice(1);
    }
    return info;
  };

  return <div className={className}>{capitalizeFirstLetter(info)}</div>;
};

export default Square;
