import { Link } from "react-router";

const Public = () => {
    return (
        <>
            <h1>Login</h1>
            <form >
                <p>
                    <label>
                        User:
                        <input
                            type="text"
                            name="user"
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Password:
                        <input
                            type="text"
                            name="password"

                        />
                    </label>
                </p>
                <button>
                    <Link to="/Play"> Login </Link>

                </button>
            </form>
        </>
    )
}

export default Public;