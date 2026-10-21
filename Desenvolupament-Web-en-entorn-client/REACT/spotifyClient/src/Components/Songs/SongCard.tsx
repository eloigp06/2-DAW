import type { SongCardProps } from "./Types/SongCardProms";

const SongCard = (props:SongCardProps) => {
    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>
            <p>{props.trackInfo.reproduccions}</p>
        </>
    )
}

export default SongCard;