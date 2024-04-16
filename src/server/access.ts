

export default async function getAccessToken() :Promise<string>
 {
    const refreshToken: string = process.env.SPOTIFY_REFRESH_TOKEN!;
    const clientId: string = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET!;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    const token:string= data.access_token;
    return token ;
}

// Example usage

