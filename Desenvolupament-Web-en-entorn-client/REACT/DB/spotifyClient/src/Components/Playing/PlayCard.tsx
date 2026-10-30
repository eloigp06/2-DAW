import type { PlayCardProps } from "./Types/PlayCardProms";
import '../../index.css';

const PlayCard = (props: PlayCardProps) => {

    function VolumenUp() {
        props.volupeUp();
    }

    function VolumenDown() {
        props.volumeDown();
    }

    function StopSong() {
        props.stop();
    }

    return (
        <div className="play-card">
            <div className="controls">
                <button onClick={VolumenDown} disabled={props.volume === 0}>-</button>
                <span>Volum: {props.volume}</span>
                <button onClick={VolumenUp} disabled={props.volume === 100}>+</button>
            </div>
            <p>{props.escolta ? props.title : "No song is playing"}</p>
        </div>
    );
};

export default PlayCard;