const clientId = '1253c0ac9a03466abf3e283e30d582a3';
const redirectUri = 'http://localhost:3000'; // Should be registered in your Spotify Developer Dashboard
const scopes = ['user-read-private', 'user-read-email']; // Add scopes as needed

// Function to authorize user and obtain Spotify access token using Implicit Grant flow
export function authorizeAndGetSpotifyAccessToken() {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const queryParams = new URLSearchParams({
        client_id: clientId,
        response_type: 'token',
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    });

    // Redirect user to Spotify authorization page
    window.location.href = `${authEndpoint}?${queryParams}`;
}