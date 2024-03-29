import React, { useState } from "react";

function SearchBar({ setSearchResults }) {

    const [searchBar, setSearchBar] = useState('');

    const handleUserInput = (e) => {
        setSearchBar(e.target.value);
    }

    const searchForTracks = (e) => {
        e.preventDefault();
        const tracks = [{
            name: 'Name1',
            artist: 'Artist1',
            album: 'Album1',
            id: 1
        }, {
            name: 'Name2',
            artist: 'Artist2',
            album: 'Album3',
            id: 2
        }, {
            name: 'Name3',
            artist: 'Artist3',
            album: 'Album3',
            id: 3
        }, {
            name: 'Name4',
            artist: 'Artist4',
            album: 'Album4',
            id: 4
        }]

        setSearchResults(tracks);
    }

    return (
        <form onSubmit={searchForTracks}>
            <label htmlFor="trackSearch">Track Search</label>
            <input
                type='text'
                name='trackSearch'
                value={searchBar}
                onChange={handleUserInput}
                id='trackSearch'></input>
            <button type='submit'>Search</button>
        </form>
    )
}

export default SearchBar;