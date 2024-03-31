import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Home = () => {
  const darkTheme = useContext(ThemeContext).darkTheme;

  return (
    <>
      <div
        className="Home"
        style={{ backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0" }}
      >
        <Link to="/classic" className="link-box classic-link">
          Classic
        </Link>
        <Link to="/blurry" className="link-box">
          Blurry Image
        </Link>
        <Link to="/zoom" className="link-box">
          Zoomed-In Image
        </Link>
      </div>
    </>
  );
};

export default Home;
