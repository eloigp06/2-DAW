import type { Track } from "../../Model/Track";
import type { SongRowProps } from "./Types/SongRowProps";

const SongRow = (props: SongRowProps) => {

    function editar() {
        const song:Track = {
            id: props.id,
            title: props.title,
            artist_id: props.artist_id,
            artist: props.artist,
            duration: props.duration
        }
        props.edit?.(song)
    }
    return (
        <tr>

            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{props.duration}</td>
            <td><button>Play</button></td>
            <td><button onClick={editar}>Edit</button></td>
        </tr>
    )
}

export default SongRow;