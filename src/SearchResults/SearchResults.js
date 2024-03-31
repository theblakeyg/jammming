import React from "react";
import Track from '../Track/Track';

import "./SearchResults.css";

function SearchResults({ searchResults, onAddTrack }) {

    return (
        <div className='SearchResults'>
            {searchResults && searchResults.map((track) => (
                <Track key={track.id} track={track} onAdd={()=>onAddTrack(track)}/>
            ))}
        </div>
    )
}

export default SearchResults;