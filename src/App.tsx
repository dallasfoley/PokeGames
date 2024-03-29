import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Zoom from "./pages/Zoom";
import Blurry from "./pages/Blurry";

function App() {
  return (
    <>
      <div className="App">
        <div className="pokegames-logo">
          <a href="/">PokeGames</a>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/classic" element={<Classic />}></Route>
            <Route path="/zoom" element={<Zoom />}></Route>
            <Route path="/blurry" element={<Blurry />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
