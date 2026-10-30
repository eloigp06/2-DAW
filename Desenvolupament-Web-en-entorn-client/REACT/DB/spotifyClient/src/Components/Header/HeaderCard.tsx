import type { HeaderCardProps } from "./Types/HeaderCardProms";
import '../../index.css'

const HeaderCard = (props: HeaderCardProps ) => {
    return (
        <header className="header-component">
            <h4>Data: {props.headerInfo.data}</h4>
            <h4>Usuari: {props.headerInfo.user}</h4>
        </header>
    )
}

export default HeaderCard;