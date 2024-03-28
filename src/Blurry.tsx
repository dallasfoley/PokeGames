import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Blurry = () => {
  const [answer, setAnswer] = useState("");
  const [answerPic, setAnswerPic] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGuess = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const rawData = await fetch(
      //   `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
      // );
      setGuessCount(guessCount + 1);
      const guess = input.toLowerCase();
      guess === answer ? setState(true) : setGuesses([guess, ...guesses]);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch Pokémon");
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
        <div className="pokegames-logo">
          <Link to="/">PokeGames</Link>
        </div>
        <div className="input-group">
          <input
            className="guess-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Pokemon name..."
          ></input>
          <button className="guess-button" onClick={() => handleGuess()}>
            Guess
          </button>
        </div>
        <img
          src={answerPic}
          className="blurry-image"
          style={{
            filter: !state ? `blur(${64 - guessCount * 8}px)` : "none", // Example scaling calculation
          }}
        />
        {state && (
          <div className="win">
            Congratulations! It took you {guessCount}{" "}
            {guessCount === 1 ? "guess" : "guesses"} to correctly guess the
            Pokemon!
          </div>
        )}
        {state && (
          <div className="blurry-answer-div">
            {capitalizeFirstLetter(answer)}
          </div>
        )}
        {guesses.map((guess) => (
          <div className="blurry-guess-div">{capitalizeFirstLetter(guess)}</div>
        ))}
      </div>
    </>
  );
};

export default Blurry;
