import { Link } from "react-router-dom";

function MainNavigation() {
    return (

        <nav>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a></li>
                <li><a href="/about">About</a></li>

            </ul>
            <Link to="/about">About</Link>
        </nav>
    );
}

export default MainNavigation;
