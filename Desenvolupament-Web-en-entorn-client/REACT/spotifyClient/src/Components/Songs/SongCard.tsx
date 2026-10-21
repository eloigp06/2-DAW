import type { SongCardProms } from "./Types/SongCardProms";

const SongCard = (props:SongCardProms) => {
    return (
        <>
            <h1>{props.trackinfo.title}</h1>
            <p>{props.trackinfo.artist}</p>
            <p>{props.trackinfo.duration}</p>
        </>
    )
}

export default SongCard;