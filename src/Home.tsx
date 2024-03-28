import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="Home">
        <div className="pokegames-logo">
          <Link to="/">PokeGames</Link>
        </div>
        <Link className="link-box classic-link" to="/classic">
          Classic
        </Link>
        <Link className="link-box" to="/blurry">
          Blurry Image
        </Link>
        <Link className="link-box" to="/zoom">
          Zoomed-In Image
        </Link>
      </div>
    </>
  );
};

export default Home;
