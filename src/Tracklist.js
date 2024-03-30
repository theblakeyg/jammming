import React from "react";
import Track from "./Track";

function Tracklist({ tracklist, onRemoveTrack }) {
    console.log('tracklist rendering')
    console.log(tracklist)

    return (
        <div>
            This is a test
            {tracklist.map((track) => {
                console.log(track);
                <Track key={track.id} track={track} onRemove={() => onRemoveTrack(track)} />
            })}
        </div>
    )
}

export default Tracklist;