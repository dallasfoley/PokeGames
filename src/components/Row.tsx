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
  const attributes = [
    name,
    type1,
    type2,
    habitat,
    color,
    evolutionStage,
    height,
    weight,
  ];

  return (
    <div className="row">
      {attributes.map((attribute, index) => (
        <Square key={index} info={attribute} isCorrect={isCorrect[index]} />
      ))}
    </div>
  );
};

export default Row;
