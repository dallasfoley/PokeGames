import { useEffect, useState } from "react";
import "./App.css";
import Row, { PokemonApi } from "./Row";

function App() {
  const [input, setInput] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState<PokemonApi[]>([]);
  const [answer, setAnswer] = useState<PokemonApi | null>(null);

  const handleGuess = async () => {
    setGuessCount(guessCount + 1);
    try {
      const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
      const data = await rawData.json();

      const speciesUrl = data.species.url;
      const speciesRawData = await fetch(speciesUrl);
      const speciesData = await speciesRawData.json();

      const pokemonData = {
        name: data.name,
        type1: data.types.length > 0 ? data.types[0].type.name : "None",
        type2: data.types.length > 1 ? data.types[1].type.name : "None",
        habitat: speciesData.habitat ? speciesData.habitat.name : "Unknown",
        color: speciesData.color ? speciesData.color.name : "Unknown",
        evolutionStage: "Unknown", // Placeholder, determining this would require additional logic
        height: `${data.height * 10} cm`,
        weight: `${data.weight / 10} kg`,
      };
      setGuesses([...guesses, pokemonData]);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch Pokémon");
    }
  };

  useEffect(() => {
    const getAnswer = async () => {
      const id = Math.floor(Math.random() * 1025);
      try {
        const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await rawData.json();
        setAnswer(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Answer Pokémon, reload page");
      }
    };
    getAnswer();
  }, []);

  console.log(`answer: ${answer?.name}`);

  return (
    <>
      <div className="App">
        <div className="wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Pokemon name..."
          ></input>
          <button onClick={() => handleGuess()}>Guess</button>
          {guessCount === 0 ? null : <div>Guess a pokemon to begin</div>}
          {guessCount > 0 && (
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
          )}
          {guesses.map((guess) => (
            <Row {...guess} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
