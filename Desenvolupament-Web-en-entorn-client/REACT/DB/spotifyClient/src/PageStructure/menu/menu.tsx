import { Link } from "react-router"

const Menu = () => {
    return (
        <nav>
            <Link to="/Public"> Login </Link>
            <Link to="/Play"> Autenticated </Link>
            <Link to="/SongManagment"> Admin</Link>
        </nav>

    )
}
export default Menu;