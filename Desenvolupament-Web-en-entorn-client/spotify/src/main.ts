import './style.css'
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/crearTitol';
import { crearTableSegons } from './view/tableSongs/crearTableSongs';

const appObj: HTMLElement=document.querySelector<HTMLDivElement>('#app')!;



appObj.appendChild(crearTitol());
appObj.appendChild(crearTableSegons());
appObj.appendChild(crearCerca());
