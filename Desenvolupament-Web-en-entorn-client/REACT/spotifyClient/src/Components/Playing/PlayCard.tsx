
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
                
                <button onClick={() => VolumenDown()}>-</button>

                <button onClick={() => VolumenUp()}>+</button>
            </p>
        </>
    )
}

export default PlayCard;