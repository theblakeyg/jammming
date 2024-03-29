import React from "react";

function Track({ track, onAdd, onRemove }) {
    return (
        <div>
            <p>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>
            <p>{track.id}</p>
            {onAdd && <button onClick={onAdd}>Add to Playlist</button>}
            {onRemove && <button onClick={onRemove}>Remove from Playlist</button>}
        </div>
    )
}

export default Track;