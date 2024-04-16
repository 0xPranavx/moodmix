
 interface QueryParams {
    limit: number;
    market: string;
    seed_artists: string;
    seed_genres: string;
    min_danceability: number;
    max_danceability: number;
    min_energy: number;
    max_energy: number;
    min_popularity: number;
    max_popularity: number;
    min_tempo: number;
    max_tempo: number;
    min_valence: number;
    max_valence: number;
}
export default async function getRecommendations(accessToken:string, queryParams: QueryParams) {
    const BASE_URL = 'https://api.spotify.com/v1';
const RECOMMENDATIONS_ENDPOINT = '/recommendations';
    // const queryParamsString = new URLSearchParams(queryParams as any) ;
    queryParams.seed_genres = queryParams.seed_genres.replace(/\s/g, '');
    queryParams.seed_artists = queryParams.seed_artists.replace(/\s/g, '');
    const queryParamsString = `limit=30&market=US&seed_artists=${queryParams.seed_artists}&seed_genres=${queryParams.seed_genres}&min_danceability=${queryParams.min_danceability}&max_danceability=${queryParams.max_danceability}&min_energy=${queryParams.min_energy}&max_energy=${queryParams.max_energy}&min_popularity=${queryParams.min_popularity}&max_popularity=${queryParams.max_popularity}&min_tempo=${queryParams.min_tempo}&max_tempo=${queryParams.max_tempo}&min_valence=${queryParams.min_valence}&max_valence=${queryParams.max_valence}`;

  const token = accessToken;
  console.log(token)

    const query = `${BASE_URL}${RECOMMENDATIONS_ENDPOINT}?${queryParamsString}`;
    console.log(query);

    try {
        const response = await fetch(`${BASE_URL}${RECOMMENDATIONS_ENDPOINT}?${queryParamsString}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations from Spotify.');
        }

        const recommendationsData = await response.json();
        

        if (!recommendationsData || !recommendationsData.tracks || recommendationsData.tracks.length === 0) {
            throw new Error('No tracks found in recommendations.');
        }
        console.log(recommendationsData);
        return recommendationsData ;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
}