import type { SongCardProps } from "./Types/SongCardProps";
import pepoSi from "../../assets/pepo.png";
import pepoNO from "../../assets/pepono.png"
import '../../index.css'

const SongCard = (props: SongCardProps) => {


    function ClickLike() {
        props.like();
    }

    function ClickPlay() {
        props.play();
    }

    function ClickReset() {
        props.reset();
    }

    return (
        <>
            <div className="song-card">



                <h1>{props.trackInfo.title}</h1>
                <p>{props.trackInfo.artist}</p>
                <p>{props.trackInfo.duration}</p>

                <p>Total reproduccions: {props.trackInfo.reproduccions}</p>
                <p><button onClick={() => ClickPlay()}>Play</button></p>

                <p>
                    <img onClick={() => ClickLike()} src={props.trackInfo.likes.like ? pepoSi : pepoNO} />
                    <p>{props.trackInfo.likes.totalLikes}</p>
                </p>


                <p><button onClick={() => ClickReset()}>Reset</button></p>
            </div>

        </>
    )
}

export default SongCard;