import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import pepoSi from "../../assets/pepo.png";
import pepoNO from "../../assets/pepono.png"


const SongCard = (props: SongCardProps) => {


    let [likes, setLikes] = useState<number>(props.trackInfo.likes);
    let [viewIcon, setViewIcon] = useState(true);


    function CanviIMG() {

    }

    function ClickPlay(){
        props.play();
    }

    function Reset() {
    }
    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>

            <p>Total reproduccions: {props.trackInfo.reproduccions}</p>
            <p><button onClick={() => ClickPlay()}>Play</button></p>


            <button onClick={CanviIMG}><img src={viewIcon ? pepoNO : pepoSi} /></button>
            <p>{likes}</p>

            <p><button onClick={Reset}>Reset</button></p>

        </>
    )
}

export default SongCard;