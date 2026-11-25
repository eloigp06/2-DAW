import { useState } from "react";
import type { PlayListCardProps } from "./Types/PlayListCardProps";
import type { GetPlayListsTracks } from "../../ApiManagments/PlayListsTrack/interface/PlayListsTracks";
import type { GetTrack } from "../../ApiManagments/Tracks/Interfaces/Track";

const PlayListCard = ({ playList, playListTracks, tracks, onPlay }: PlayListCardProps) => {
    const [expandedPlaylists, setExpandedPlaylists] = useState<Set<string>>(() => new Set());

    function togglePlaylist(playlistId: string) {
        setExpandedPlaylists((current) => {
            const next = new Set(current);
            if (next.has(playlistId)) {
                next.delete(playlistId);
            } else {
                next.add(playlistId);
            }
            return next;
        });
    }

    return (
        <section id="playlist">
            <h2>Playlists</h2>
            {playList.map((playList) => {
                const playlistSongs = playListTracks
                    .filter((playListTracks) => playListTracks.playlist_id === playList.id)
                    .map((playListTracks) => ({
                        playListTracks,
                        track: tracks.find((track) => track.id === playListTracks.track_id),
                    }))
                    .filter((item): item is { playListTracks: GetPlayListsTracks; track: GetTrack } => item.track !== undefined);
                const isExpanded = expandedPlaylists.has(playList.id);

                return (

                    < article key={playList.id} >
                        <h3>{playList.title}</h3>
                        <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`playlist-songs-${playList.id}`}
                            onClick={() => togglePlaylist(playList.id)}
                        >
                            {isExpanded ? "Amaga cançons" : "Mostra cançons"}
                        </button>
                        {isExpanded && (
                            <ul id={`playlist-songs-${playList.id}`}>
                                {playlistSongs.length > 0
                                    ? playlistSongs.map(({ playListTracks, track }) => (
                                        <li key={playListTracks.id}>
                                            <span>{track.title} — {track.artist}</span>
                                            <button type="button" onClick={() => onPlay(track)}>Play</button>
                                        </li>
                                    ))
                                    : <></>}
                            </ul>
                        )}
                    </article>
                );
            })}
        </section>
    );
};

export default PlayListCard;