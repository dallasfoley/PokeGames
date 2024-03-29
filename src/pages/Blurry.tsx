import { useState, useEffect } from "react";

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
        <div className="input-group">
          <input
            className="guess-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Pokemon name..."
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          ></input>
          <button className="guess-button" onClick={() => handleGuess()}>
            Guess
          </button>
        </div>
        <img
          src={answerPic}
          className="blurry-image"
          style={{
            filter: !state ? `blur(${64 - guessCount * 8}px)` : "none",
            width: "500px",
            height: "500px",
            objectFit: "contain",
            transition: "transform 0.3s ease",
          }}
        />
        {state && (
          <div className="win">
            Congratulations! It took you {guessCount}{" "}
            {guessCount === 1 ? "guess" : "guesses"} to correctly guess the
            Pokemon!
            <div className="blurry-answer-div">
              {capitalizeFirstLetter(answer)}
            </div>
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
