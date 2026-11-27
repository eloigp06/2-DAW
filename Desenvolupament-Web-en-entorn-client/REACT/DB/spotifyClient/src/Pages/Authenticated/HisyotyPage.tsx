import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ENV } from "../../Config/env";
import type { AddHistory } from "../../ApiManagments/History/Intrefaces/HistoryCreate";

const HisyotyPage = () => {
    const [history, setHistory] = useState<{ title: string; date: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function carregarHistorial() {
        const resposta = await fetch(`${ENV.API_BASE_URL}/histoyes`);
        const listHistory: AddHistory[] = await resposta.json() as AddHistory[];

    }
    useEffect(
        () => {
            carregarHistorial();
        }, []
    );


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

                {error && <p role="alert">{error}</p>}
                <table>
                    <tbody>
                        {history.map((entry, index) => (
                            <tr key={`${entry.date}-${index}`}>
                                <td>{entry.title}</td>
                                <td>{entry.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default HisyotyPage;