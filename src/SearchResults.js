import React from "react";
import Track from './Track';

function SearchResults({ searchResults, onAddTrack }) {

    return (
        <div>
            {searchResults && searchResults.map((track) => (
                <Track key={track.id} track={track} onAdd={()=>onAddTrack(track)}/>
            ))}
        </div>
    )
}

export default SearchResults;