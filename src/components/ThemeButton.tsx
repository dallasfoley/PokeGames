import { useContext } from "react";
import { ThemeContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeButton = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <button
        onClick={() => setDarkTheme(!darkTheme)}
        aria-label="Toggle Theme"
        title="Toggle Theme"
        style={{
          backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0",
          border: darkTheme ? "2px solid #ffffff" : "2px solid #2f3133",
          color: darkTheme ? "#fff" : "#2f3133",
        }}
      >
        {darkTheme ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </button>
    </div>
  );
};

export default ThemeButton;
