import { useState, useEffect } from "react";

const Zoom = () => {
  const [answer, setAnswer] = useState("");
  const [answerPic, setAnswerPic] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(750);

  const handleGuess = async () => {
    try {
      const guess = input.toLowerCase();
      guess === answer ? setState(true) : setGuesses([guess, ...guesses]);
      setZoomPercent(zoomPercent - 50);
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
          console.log(answer);
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
      <div className="Zoom">
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
          <div className="win">
            Congratulations! It took you {guesses.length}{" "}
            {guesses.length === 1 ? "guess" : "guesses"} to correctly guess the
            Pokemon!
            <div className="zoom-answer-div">
              {capitalizeFirstLetter(answer)}
            </div>
          </div>
        )}
        {guesses.map((guess) => (
          <div className="zoom-guess-div">{capitalizeFirstLetter(guess)}</div>
        ))}
      </div>
    </>
  );
};

export default Zoom;
