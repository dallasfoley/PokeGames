import { useState, useEffect, useContext } from "react";
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

const Zoom = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [zoomPercent, setZoomPercent] = useState(750);
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
    const fetchAnswer = async () => {
      const data = await getAnswer();
      setAnswer(data);
    };
    fetchAnswer().catch(console.error);
  }, []);

  return (
    <>
      <div
        className="Zoom"
        style={{ backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0" }}
      >
        <InputGuess
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
        />
        {state ? (
          <img
            src={answer[1]}
            alt="Answer"
            style={{ width: "500px", height: "500px", margin: "20px auto" }}
          />
        ) : (
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${answer[1]})`,
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
