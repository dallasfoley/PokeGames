import Square from "./Square";

export type PokemonApi = {
  name: string;
  type1: string;
  type2: string;
  habitat: string;
  color: string;
  evolutionStage: string;
  height: string;
  weight: string;
  isCorrect: boolean[];
};

const Row = ({
  name,
  type1,
  type2,
  habitat,
  color,
  evolutionStage,
  height,
  weight,
  isCorrect,
}: PokemonApi) => {
  return (
    <div className="row">
      <Square info={name} isCorrect={isCorrect[0]} />
      <Square info={type1} isCorrect={isCorrect[1]} />
      <Square info={type2} isCorrect={isCorrect[2]} />
      <Square info={habitat} isCorrect={isCorrect[3]} />
      <Square info={color} isCorrect={isCorrect[4]} />
      <Square info={evolutionStage} isCorrect={isCorrect[5]} />
      <Square info={height} isCorrect={isCorrect[6]} />
      <Square info={weight} isCorrect={isCorrect[7]} />
    </div>
  );
};

export default Row;
