import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Zoom from "./pages/Zoom";
import Blurry from "./pages/Blurry";
import ThemeButton from "./components/ThemeButton";

interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: (value: boolean | ((val: boolean) => boolean)) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: true,
  setDarkTheme: () => {},
});

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <div
          className="App"
          style={{
            backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0",
            color: darkTheme ? "#fff" : "#2f3133",
          }}
        >
          <div className="pokegames-logo">
            <a href="/">PokeGames</a>
          </div>
          <ThemeButton />
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
