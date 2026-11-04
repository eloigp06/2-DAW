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
                            key={t.id}
                            title={t.title}
                            artist={t.artist_id}
                            duration={t.duration} />
                    }
                )
            }
        </>
    )
}

export default ListSongs;