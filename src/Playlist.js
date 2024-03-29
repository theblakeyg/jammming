import React, { useState } from "react";
import Track from "./Track";

function Playlist({ tracklist, onRemoveTrack }) {

    const [playlistName, setPlaylistName] = useState('My Playlist');

    const handleNameChange = (e) => {
        setPlaylistName(e.target.value);
    }

    const savePlaylist = () => {
        console.log(playlistName);
        console.log(tracklist);
    }

    return (
        <div>
            <h2>Playlist</h2>
            <input type='text' name='playlistName' id='playlistName' onChange={handleNameChange} value={playlistName}></input>
            {tracklist.map((track) => (
                <Track key={track.id} track={track} onRemove={() => onRemoveTrack(track)} />
            ))}
            <button onClick={savePlaylist}>Save Playlist</button>
        </div>
    )
}

export default Playlist;