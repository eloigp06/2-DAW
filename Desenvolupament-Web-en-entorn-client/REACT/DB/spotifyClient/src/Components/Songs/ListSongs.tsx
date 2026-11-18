import type { GetTrack } from "../../ApiManagments/Tracks/Interfaces/Track";
import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";

const ListSongs = (props: SongListProps) => {

    return (
        <>
            {
                props.tracks.map(
                    (t: GetTrack) => {
                        return <SongRow
                            id={t.id}
                            key={t.id}
                            title={t.title}
                            artist={t.artist}
                            artist_id={t.artist_id}
                            duration={t.duration}
                            edit={props.edit}
                        />
                    }
                )
            }
        </>
    )
}

export default ListSongs;