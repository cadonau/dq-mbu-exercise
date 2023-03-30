import { Link } from "react-router-dom";

function MainNavigation() {
    return (

        <nav>

            <Link to="/"> Home</Link> |

            <Link to="/tagesmenu"> Tagesmenü</Link>

            <Link to="/lunch-menu">Mittagsmenü</Link>

        </nav>
    );
}

export default MainNavigation;
