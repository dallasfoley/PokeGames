import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";

const Zoom = () => {
  const [answer, setAnswer] = useState("");
  const [answerPic, setAnswerPic] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(750);
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
        setZoomPercent(zoomPercent - 50);
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
    if (!answer[0] && !loading && !state) {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="Zoom"
        style={{ backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0" }}
      >
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
        {state ? (
          <img
            src={answerPic}
            alt="Answer"
            style={{ width: "500px", height: "500px", margin: "20px auto" }}
          />
        ) : (
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${answerPic})`,
              backgroundSize: `${zoomPercent}%`,
              backgroundPosition: "center",
              width: "500px",
              height: "500px",
              margin: "20px auto",
              border: "1px solid black",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}

        {state && (
          <div
            className="win"
            style={{ color: darkTheme ? "#ebfffc" : "#2f3133" }}
          >
            Congratulations! It took you {guesses.length}{" "}
            {guesses.length === 1 ? "guess" : "guesses"} to correctly guess the
            Pokemon!
          </div>
        )}
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="zoom-div zoom-guess"
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

export default Zoom;
