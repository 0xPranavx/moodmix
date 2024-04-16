export default async function createPlaylist(accessToken:string, userId:string, playlistName:string) {
    const BASE_URL = 'https://api.spotify.com/v1';
    const response = await fetch(`${BASE_URL}/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: playlistName,
            public: true // Set to true for public playlist
        })
    });

    const playlistData = await response.json();
    console.log(playlistData);
    return playlistData.id;
}