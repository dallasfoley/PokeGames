import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import names from "../names";

const InputGuess = ({
  input,
  setInput,
  handleGuess,
}: {
  input: string;
  setInput: (value: string) => void;
  handleGuess: () => void;
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let newValue = event.target.value;
    setInput(newValue);
    newValue = event.target.value.toLowerCase();
    const newFilter = names.filter((value) => {
      return value.toLowerCase().includes(newValue.toLowerCase());
    });
    newValue === "" ? setFilteredData([]) : setFilteredData(newFilter);
  };

  return (
    <div className="input-group">
      <div className="input">
        <input
          className="guess-input"
          value={input}
          onChange={(e) => handleFilter(e)}
          placeholder="Type Pokemon name..."
          onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          style={{
            background: darkTheme ? "#ebfffc" : "#2f3133",
            color: darkTheme ? "#2f3133" : "#f0f0f0",
          }}
        />
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
      {filteredData.length > 0 && (
        <div
          className="dataResult"
          style={{
            color: darkTheme ? "#2f3133" : "#ebfffc",
            background: darkTheme ? "#ebfffc" : "#2f3133",
          }}
        >
          {filteredData.slice(0, 15).map((name, key) => (
            <button
              className="dataItem"
              onClick={() => {
                setInput(name);
                handleGuess();
              }}
              key={key}
              style={{
                color: darkTheme ? "#2f3133" : "#ebfffc",
                background: darkTheme ? "#ebfffc" : "#2f3133",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputGuess;
