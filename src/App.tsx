import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Classic from "./Classic";
import Zoom from "./Zoom";
import Blurry from "./Blurry";

function App() {
  return (
    <>
      <div className="App">
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
