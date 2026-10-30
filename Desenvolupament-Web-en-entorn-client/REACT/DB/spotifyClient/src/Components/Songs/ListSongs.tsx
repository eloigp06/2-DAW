import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";
import type { TrackListView } from "./Types/TrackListView copy";

const ListSongs = (props: SongListProps) => {

    return (
        <>
            {
                props.tracks.map(
                    (t: TrackListView) => {
                        return <SongRow
                            key={t.id}
                            title={t.title}
                            artist={t.title}
                            duration={t.duration} />
                    }
                )
            }
        </>
    )
}

export default ListSongs;