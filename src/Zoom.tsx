import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Zoom = () => {
  const [answer, setAnswer] = useState("");
  const [answerPic, setAnswerPic] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);

  const handleGuess = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const rawData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
      );
      setGuessCount(guessCount + 1);
      const guess = input.toLowerCase();
      guess === answer ? setState(true) : setGuesses([guess, ...guesses]);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch Pokémon");
    }
  };

  useEffect(() => {
    const getAnswer = async () => {
      const id = Math.floor(Math.random() * 151);
      try {
        const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await rawData.json();
        setAnswer(data.name);
        setAnswerPic(data.sprites.front_default);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Answer Pokémon, reload page");
      }
    };
    getAnswer();
  }, []);

  return (
    <>
      <div className="Zoom">
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
        {!state && (
          <div>
            <img src={answerPic} className="zoom-image" />
          </div>
        )}
        {state && (
          <div className="win">
            Congratulations! It took you {guessCount}{" "}
            {guessCount === 1 ? "guess" : "guesses"} to correctly guess the
            Pokemon!
            <img src={answerPic} className="zoom-image" />
          </div>
        )}
        {state && <div className="zoom-answer-div">{answer}</div>}
        {guesses.map((guess) => (
          <div className="zoom-guess-div">{guess}</div>
        ))}
      </div>
    </>
  );
};

export default Zoom;
