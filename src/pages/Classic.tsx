import { useState, useEffect, useRef } from "react";
import "../App.css";
import Row from "../components/Row";
import { PokemonApi } from "../components/Row";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Classic = () => {
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<PokemonApi[]>([]);
  const [answer, setAnswer] = useState<PokemonApi | null>(null);
  const [answerPic, setAnswerPic] = useState("");
  const [state, setState] = useState(false);
  const darkTheme = useContext(ThemeContext).darkTheme;
  const renderCountRef = useRef(0);

  const getPokemonData = async (url: string) => {
    const rawData = await fetch(url);
    const data = await rawData.json();
    const speciesUrl = data.species.url;
    const speciesRawData = await fetch(speciesUrl);
    const speciesData = await speciesRawData.json();
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainRawData = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainRawData.json();
    renderCountRef.current === 0 && setAnswerPic(data.sprites.front_default);
    renderCountRef.current = renderCountRef.current + 1;
    let evolutionStage;
    const evolvesFrom = speciesData.evolves_from_species;
    const firstEvolution = evolutionChainData.chain;

    if (!evolvesFrom && firstEvolution.evolves_to.length > 0) {
      evolutionStage = "1";
    } else if (
      evolvesFrom &&
      firstEvolution.evolves_to.length > 0 &&
      firstEvolution.evolves_to[0].evolves_to.length > 0
    ) {
      evolutionStage = "2";
    } else {
      evolutionStage = "3";
    }
    const pokemonData = {
      name: data.name,
      type1: data.types.length > 0 ? data.types[0].type.name : "None",
      type2: data.types.length > 1 ? data.types[1].type.name : "None",
      habitat: speciesData.habitat ? speciesData.habitat.name : "Unknown",
      color: speciesData.color ? speciesData.color.name : "Unknown",
      evolutionStage: evolutionStage,
      height: `${data.height * 10} cm`,
      weight: `${data.weight / 10} kg`,
      isCorrect:
        guesses.length === 0
          ? [false]
          : [
              answer && data.name === answer.name ? true : false,
              answer && data.types[0].type.name === answer.type1 ? true : false,
              (answer &&
                data.types.length > 1 &&
                data.types[1].type.name === answer.type2) ||
              (data.types.length === 1 && answer?.type2 === "None")
                ? true
                : false,
              answer && speciesData.habitat.name === answer.habitat
                ? true
                : false,
              answer && speciesData.color.name === answer.color ? true : false,
              answer && evolutionStage === answer.evolutionStage ? true : false,
              answer && `${data.height * 10} cm` === answer.height
                ? true
                : false,
              answer && `${data.weight / 10} kg` === answer.weight
                ? true
                : false,
            ],
    };
    return pokemonData;
  };

  const handleGuess = async () => {
    if (state === false) {
      try {
        const data = await getPokemonData(
          `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
        );
        setGuesses([data, ...guesses]);
        answer && data.name === answer.name && setState(true);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Pokémon");
      }
    }
  };

  useEffect(() => {
    const getAnswer = async () => {
      const id = Math.floor(Math.random() * 151);
      try {
        const data = await getPokemonData(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setAnswer(data);
        console.log(data.name);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Answer Pokémon, reload page");
      }
    };
    getAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="Classic"
        style={{ backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0" }}
      >
        <div className="wrapper">
          <div className="input-group">
            <input
              className="guess-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type Pokemon name..."
              onKeyDown={(e) => e.key === "Enter" && handleGuess()}
              style={{
                background: darkTheme ? "#ebfffc" : "#2f3133",
                color: darkTheme ? "#2f3133" : "#f0f0f0",
              }}
            ></input>
            <button
              className="guess-button"
              onClick={() => handleGuess()}
              style={{
                color: darkTheme ? "#2f3133" : "#ebfffc",
                background: darkTheme ? "#ebfffc" : "#2f3133",
              }}
            >
              Guess
            </button>
          </div>
          {state && (
            <div className="win">
              Congratulations! It took you {guesses.length}{" "}
              {guesses.length === 1 ? "guess" : "guesses"} to correctly guess
              the Pokemon!
              <img className="classic-img" src={answerPic}></img>
            </div>
          )}
          {guesses.length > 0 ? (
            <div className="attributes-header">
              <div>Name</div>
              <div>Type 1</div>
              <div>Type 2</div>
              <div>Habitat</div>
              <div>Color</div>
              <div>Stage</div>
              <div>Height</div>
              <div>Weight</div>
            </div>
          ) : (
            <div
              style={{
                fontSize: "20px",
                color: darkTheme ? "#ffffff" : "#2f3133",
              }}
            >
              Guess a Pokemon to begin
            </div>
          )}
          {guesses.map((guess) => (
            <Row {...guess} key={guess.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Classic;
