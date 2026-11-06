import type { PlayCardProps } from "./Types/PlayCardProms";
import '../../index.css';

const PlayCard = (props: PlayCardProps) => {

    function VolumenUp() {
        props.volupeUp();
    }

    function VolumenDown() {
        props.volumeDown();
    }

    return (
        <div className="play-card">
            <div className="controls">
                <button onClick={VolumenDown} disabled={props.volume === 0}>-</button>
                <span>Volum: {props.volume}</span>
                <button onClick={VolumenUp} disabled={props.volume === 100}>+</button>
            </div>
            
            <p>{props.escolta ?? 'No song is playing'}</p>
            {props.playingTitle !== null && (
                <button type="button" onClick={props.stop}>Stop</button>
            )}
        </div>
    );
};

export default PlayCard;