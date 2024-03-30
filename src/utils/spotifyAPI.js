const clientId = '1253c0ac9a03466abf3e283e30d582a3';
const redirectUri = 'http://localhost:3000'; // Should be registered in your Spotify Developer Dashboard
let accessToken;

const formatTracks = (spotifyTracks) => {
    return spotifyTracks.map((spotifyTrack) => {
        return {
            id: spotifyTrack.id,
            name: spotifyTrack.name,
            artist: spotifyTrack.artists[0].name,
            album: spotifyTrack.album.name,
            uri: spotifyTrack.uri
        }
    })
}

const SpotifyAPI = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    async searchForTracks(searchString) {
        const accessToken = this.getAccessToken();

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
            return formatTracks(spotifyTracks);
        } catch (error) {
            console.error('Error searching for tracks:', error.message);
            return [];
        }
    },
    async createNewPlaylist(playlistName, trackUris) {
        try {
            const accessToken = this.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}` };

            //Get userId
            const meResponse = await fetch('https://api.spotify.com/v1/me', { headers });
            if (!meResponse.ok) {
                throw new Error('Failed to fetch user ID');
            }
            const meJson = await meResponse.json();
            const userId = meJson.id;
            console.log(`Get user id: ${userId}`);
            console.log(`User playlistName: ${playlistName}`);

            //Create Playlist
            const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            });
            if (!createPlaylistResponse.ok) {
                throw new Error('Failed to create playlist');
            }
            const createPlaylistJson = await createPlaylistResponse.json();
            const playlistId = createPlaylistJson.id;

            //Add tracks to playlist
            const addTracksResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris })
            });
            if (!addTracksResponse.ok) {
                throw new Error('Failed to add tracks to playlist');
            }

            return true;
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default SpotifyAPI;