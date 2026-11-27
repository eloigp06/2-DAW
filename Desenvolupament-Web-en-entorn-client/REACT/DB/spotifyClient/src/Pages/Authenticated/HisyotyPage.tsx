import { Link } from "react-router";

const HisyotyPage = () => {
    return (
        <>
            <h1>Historial</h1>
            <form >
                <button>
                    <Link to="/Play"> Menu </Link>
                </button>
                <button>
                    <Link to="/PlayListsPage"> PlayList </Link>
                </button>

            </form>
        </>
    )
}

export default HisyotyPage;