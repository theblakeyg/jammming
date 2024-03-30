import React, { useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import SpotifyAPI from './utils/spotifyAPI'
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState();
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlist, setPlaylist] = useState([]);

  const search = useCallback((term) => {
    SpotifyAPI.searchForTracks(term).then(setSearchResults);
  }, []);

  const addTrackToPlaylist = (track) => {
    setPlaylist([...playlist, track]);
    // Remove the track from search results
    setSearchResults(searchResults.filter((item) => item.id !== track.id));
  }

  const removeTrackFromPlaylist = (track) => {
    setPlaylist(playlist.filter((item) => item.id !== track.id));
    setSearchResults([...searchResults, track]);
  }

  const createNewPlaylist = useCallback(() => {
    const trackUris = playlist.map((track) => track.uri);
    SpotifyAPI.createNewPlaylist(playlistName, trackUris).then(()=>{
      setPlaylistName("New Playlist");
      setPlaylist([]);
    });
  }, [playlistName, playlist])

  return (
    <div>
      <SearchBar onSearch={search} />
      <SearchResults searchResults={searchResults} onAddTrack={addTrackToPlaylist} />
      <Playlist tracklist={playlist} playlistName={playlistName} onRemoveTrack={removeTrackFromPlaylist} onCreatePlaylist={createNewPlaylist} onPlaylistNameChange={setPlaylistName}/>
    </div>

  );
}

export default App;