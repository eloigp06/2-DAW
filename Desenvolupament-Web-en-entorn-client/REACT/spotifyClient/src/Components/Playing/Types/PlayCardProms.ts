import type { PlayView } from "./PlayView";

export interface PlayCardProps {
    PlayInfo: PlayView;
    volupeUp: () => void;
    volumeDown: () => void; 
    
}