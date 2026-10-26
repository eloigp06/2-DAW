import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProms";
import pepoSi from "../../assets/pepo.png";
import pepoNO from "../../assets/pepono.png"


const SongCard = (props: SongCardProps) => {


    let [totalReproductions, setTotalReproductions] = useState<number>(props.trackInfo.reproduccions);
    let [likes, setLikes] = useState<number>(props.trackInfo.likes);
    let [viewIcon, setViewIcon] = useState(true);


    function CanviIMG() {
        if (viewIcon) {
            setLikes(prev => prev + 1);
        } else {
            setLikes(prev => prev - 1);
        }
        setViewIcon(prev => !prev);
    }

    function ClickPlay(amount: number) {
        const tr = (prev: number) => { return prev + amount }
        setTotalReproductions(tr);
    }


    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>

            <p>Total reproduccions: {totalReproductions}</p>
            <p><button onClick={() => ClickPlay(1)}>Play 1</button></p>
            <p><button onClick={() => ClickPlay(5)}>Play 5</button></p>
            <p><button onClick={() => ClickPlay(10)}>Play 10</button></p>


            <button onClick={CanviIMG}><img src={viewIcon ? pepoNO : pepoSi} /></button>
            <p>{likes}</p>



        </>
    )
}

export default SongCard;