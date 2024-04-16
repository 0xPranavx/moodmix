export default async function addTracksToPlaylist(accessToken:string, playlistId:string, trackUris:string[]) {
    const BASE_URL = 'https://api.spotify.com/v1';
    const response = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: trackUris })
    });

    if (!response.ok) {
        throw new Error('Failed to add tracks to playlist.');
    }
}