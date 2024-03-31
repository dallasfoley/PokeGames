import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Blurry = () => {
  const [answer, setAnswer] = useState("");
  const [answerPic, setAnswerPic] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const darkTheme = useContext(ThemeContext).darkTheme;

  const handleGuess = async () => {
    if (!state) {
      try {
        if (input.toLowerCase() === answer.toLowerCase()) {
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
    if (answer === "" && !loading && !state) {
      const getAnswer = async () => {
        setLoading(true);
        const id = Math.floor(Math.random() * 151);
        try {
          const rawData = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const data = await rawData.json();
          setAnswer(data.name);
          setAnswerPic(data.sprites.front_default);
          console.log(data.name);
        } catch (error) {
          console.error(error);
          alert("Failed to fetch Answer Pokémon, reload page");
        } finally {
          setLoading(false);
        }
      };
      getAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="Blurry">
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
        <img
          src={answerPic}
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
