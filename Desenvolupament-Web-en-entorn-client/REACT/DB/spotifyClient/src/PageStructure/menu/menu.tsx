import { Link } from "react-router"

const Menu = () => {
    return (
        <nav>
            <Link to="/Play"> Repeoduir </Link>
            <Link to="/SongManagment"> Gestió Cançons</Link>
        </nav>

    )
}
export default Menu;