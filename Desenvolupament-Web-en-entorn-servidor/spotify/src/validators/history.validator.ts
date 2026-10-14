
import { historyes } from "../data/history/history";
import { History } from "../interfaces/history/history";
import { historyBD } from "../interfaces/history/historyBD";


export function isValidHistory(history: History): boolean | string | undefined {

    if (!history) {
        return false;
    }
    if (!history.user || !history.track || !history.data) {
        return false
    }


    const historyOK: historyBD | undefined = historyes.find(
        (h: historyBD) => { h.id === history.track}
    )
    if (!historyOK) {
        console.log("BODY NO VALID");
        return false;
    }
    console.log("OK")
    return true;
}