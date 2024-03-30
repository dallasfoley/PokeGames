import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Zoom from "./pages/Zoom";
import Blurry from "./pages/Blurry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const ThemeContext = createContext(true);

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <div
          className="App"
          style={{
            backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0",
            border: darkTheme ? "2px solid #ffffff" : "2px solid #2f3133",
            color: darkTheme ? "#fff" : "#2f3133",
          }}
        >
          <div className="pokegames-logo">
            <a href="/">PokeGames</a>
          </div>
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
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/classic" element={<Classic />}></Route>
              <Route path="/blurry" element={<Blurry />}></Route>
              <Route path="/zoom" element={<Zoom />}></Route>
            </Routes>
          </Router>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
