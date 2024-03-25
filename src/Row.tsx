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
}: PokemonApi) => {
  return (
    <div className="row">
      <Square info={name} />
      <Square info={type1} />
      <Square info={type2} />
      <Square info={habitat} />
      <Square info={color} />
      <Square info={evolutionStage} />
      <Square info={height} />
      <Square info={weight} />
    </div>
  );
};

export default Row;
