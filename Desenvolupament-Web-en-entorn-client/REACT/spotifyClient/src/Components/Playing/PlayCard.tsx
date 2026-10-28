
import type { PlayCardProps } from "./Types/PlayCardProms";



const PlayCard = (props: PlayCardProps) => {


    function VolumenUp() {
        props.volupeUp();
    }

    function VolumenDown() {
        props.volumeDown();
    }
    return (
        <>
            <p>
                <div className="volume">
                    <button onClick={() => VolumenDown()} disabled={props.volume === 0}>-</button>
                    <span>Volum: {props.volume}</span>
                    <button onClick={() => VolumenUp()} disabled={props.volume === 100}>+</button>
                </div>
                <p>{props.escolta ? "Playing song" : null}</p>

            </p>
        </>
    )
}

export default PlayCard;