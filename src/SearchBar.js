import React, { useState } from "react";

function SearchBar({ setSearchResults, accessToken }) {

    const [searchString, setSearchString] = useState('');

    const handleUserInput = (e) => {
        setSearchString(e.target.value);
    }

    const formatTracks = (spotifyTracks) => {
        return spotifyTracks.map((spotifyTrack) => {
            return {name: spotifyTrack.name,
            artist: spotifyTrack.artists[0].name,
            album: spotifyTrack.album.name,
            id: spotifyTrack.id}
        })
    }

    const searchForTracks = async (e) => {
        e.preventDefault();

        const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchString)}&type=track`;

        try {
            const response = await fetch(searchEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to search for tracks on Spotify');
            }

            const data = await response.json();
            const spotifyTracks = data.tracks.items;
            setSearchResults(formatTracks(spotifyTracks));
        } catch (error) {
            console.error('Error searching for tracks:', error.message);
            return [];
        }
    }

    return (
        <form onSubmit={searchForTracks}>
            <label htmlFor="trackSearch">Track Search</label>
            <input
                type='text'
                name='trackSearch'
                value={searchString}
                onChange={handleUserInput}
                id='trackSearch'></input>
            <button type='submit'>Search</button>
        </form>
    )
}

export default SearchBar;