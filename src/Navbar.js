import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>VOLO-WIZARD</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/motivation">Motivation</Link>
                <Link to="/about">Documentation</Link>
                <Link to="/author">Author</Link>
                <Link to="/predictor">Predictor</Link>
            </div>
        </nav>

     );
}
 
export default Navbar;