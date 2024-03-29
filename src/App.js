import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import {authorizeAndGetSpotifyAccessToken} from './utils/spotifyAuthorization';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState();
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Check if access token is present in URL hash fragment
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      // Access token is present, handle it as needed (e.g., store it in state or localStorage)
      console.log('Access token:', accessToken);
      setAccessToken(accessToken);
    } else {
      // Access token not present, initiate authorization flow
      authorizeAndGetSpotifyAccessToken();
    }
  }, []); // Empty dependency array ensures this runs only once when the component mount
  
  const addTrackToPlaylist = (track) => {
    setPlaylist([...playlist, track]);
    // Remove the track from search results
    setSearchResults(searchResults.filter((item) => item.id !== track.id));
  }

  const removeTrackFromPlaylist = (track) => {
    setPlaylist(playlist.filter((item) => item.id !== track.id));
    setSearchResults([...searchResults, track]);
  }

  return (
    <div>
      This is a test
      <SearchBar setSearchResults={setSearchResults} accessToken={accessToken}/>
      <SearchResults searchResults={searchResults} onAddTrack={addTrackToPlaylist}/>
      <Playlist tracklist={playlist} onRemoveTrack={removeTrackFromPlaylist}/>
    </div>

  );
}

export default App;