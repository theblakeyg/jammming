import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState();
  const [playlist, setPlaylist] = useState([]);

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
      <SearchBar setSearchResults={setSearchResults}/>
      <SearchResults searchResults={searchResults} onAddTrack={addTrackToPlaylist}/>
      <Playlist tracklist={playlist} onRemoveTrack={removeTrackFromPlaylist}/>
    </div>

  );
}

export default App;
