import React, { useState } from "react";
import Track from "../Track/Track";

import "./Playlist.css";

function Playlist({ tracklist, playlistName, onRemoveTrack, onPlaylistNameChange, onCreatePlaylist }) {

    const handleNameChange = (e) => {
        onPlaylistNameChange(e.target.value);
    }

    return (
        <div className='Playlist'>
            <input type='text' name='playlistName' id='playlistName' onChange={handleNameChange} value={playlistName}></input>
            {tracklist.map((track) => (
                <Track key={track.id} track={track} onRemove={() => onRemoveTrack(track)} />
            ))}
            <button className='Playlist-save' onClick={onCreatePlaylist}>Save Playlist</button>
        </div>
    )
}

export default Playlist;