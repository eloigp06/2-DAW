import { Link } from "react-router";

const PlayListPage = () => {
    return (
        <>
            <h1>PlayLists</h1>
            <form >
                <button>
                    <Link to="/Play"> Menu </Link>

                </button>
                <button>
                    <Link to="/HisyotyPage"> Historial </Link>
                </button>
            </form>
        </>
    )
}

export default PlayListPage;