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
  return <div className={className}>{info}</div>;
};

export default Square;
