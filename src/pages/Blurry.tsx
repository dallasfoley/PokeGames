import { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";
import InputGuess from "../components/InputGuess";

const id = Math.floor(Math.random() * 151);

const getAnswer = async (): Promise<string[]> => {
  try {
    const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await rawData.json();
    return [data.name, data.sprites.front_default];
  } catch (error) {
    console.error(error);
    alert("Failed to fetch Answer Pokémon, reload page");
    return ["", ""];
  }
};

const Blurry = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const darkTheme = useContext(ThemeContext).darkTheme;

  const handleGuess = async () => {
    if (!state) {
      try {
        if (input.toLowerCase() === answer[0].toLowerCase()) {
          setGuesses([input.toLowerCase(), ...guesses]);
          setState(true);
        } else {
          setGuesses([input.toLowerCase(), ...guesses]);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Pokémon");
      }
    }
  };

  const capitalizeFirstLetter = (info: string | number) => {
    if (typeof info === "string") {
      return info.charAt(0).toUpperCase() + info.slice(1);
    }
    return info;
  };

  useEffect(() => {
    const fetchAnswer = async () => {
      const data = await getAnswer();
      setAnswer(data);
    };
    fetchAnswer().catch(console.error);
  }, []);

  return (
    <>
      <div
        className="Blurry"
        style={{ backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0" }}
      >
        <InputGuess
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
        />

        <img
          src={answer[1]}
          className="blurry-image"
          style={{
            filter: !state ? `blur(${64 - guesses.length * 8}px)` : "none",
            width: "500px",
            height: "500px",
            objectFit: "contain",
            transition: "transform 0.3s ease",
          }}
        />
        {state && (
          <div className="win">
            <div style={{ color: darkTheme ? "#ebfffc" : "#2f3133" }}>
              Congratulations! It took you {guesses.length}{" "}
              {guesses.length === 1 ? "guess" : "guesses"} to correctly guess
              the Pokemon!
            </div>
          </div>
        )}
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="blurry-div blurry-guess"
            style={{
              backgroundColor: state && index === 0 ? "green" : "red",
              border: darkTheme ? "2px #fff solid" : "2px #2f3133 solid",
              color: darkTheme ? "#ebfffc" : "#2f3133",
            }}
          >
            {capitalizeFirstLetter(guess)}
          </div>
        ))}
      </div>
    </>
  );
};

export default Blurry;
