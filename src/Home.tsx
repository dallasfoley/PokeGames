import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="Home">
        <div className="pokegames-logo">
          <Link to="/">PokeGames</Link>
        </div>
        <div className="link-box classic-link">
          <Link to="/classic">Classic</Link>
        </div>
        <div className="link-box">
          <Link to="/zoom">Zoomed-In Image</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
