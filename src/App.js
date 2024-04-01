import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import SpotifyAPI from './utils/spotifyAPI'
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState();
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    SpotifyAPI.getAccessToken();
  }, []);

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
    SpotifyAPI.createNewPlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylist([]);
    });
  }, [playlistName, playlist])

  return (
    <div>
      <div className='App'>
        <SearchBar onSearch={search} />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAddTrack={addTrackToPlaylist} />
          <Playlist tracklist={playlist} playlistName={playlistName} onRemoveTrack={removeTrackFromPlaylist} onCreatePlaylist={createNewPlaylist} onPlaylistNameChange={setPlaylistName} />
        </div>
      </div>
    </div>

  );
}

export default App;