"use server"
import moodFinder from '@/server/openai'
import getRecommendations from '@/server/get-recommenation';
import getAccessToken from '@/server/access';
import createPlaylist from '@/server/create-playlist';
import addTracksToPlaylist from '@/server/add-track';
import { revalidatePath } from 'next/cache';

interface ServerOption {
    
    value: string;
    // Optional img property
    disable?: boolean; // Optional disable property
    id?: string;
  }
  
  // Server-side type for the FormSchema
  interface ServerForm {
    artistdata: ServerOption[]; // Array of ServerOption objects
    playlistName: string;
    mood: string;
    genre: ServerOption[];
  }
  interface Track {
    uri: string;
    // Add other properties of the track if needed
}
export default async function formdata(formData:ServerForm) {
    
    // mutate data
    // revalidate cache
    const mood = formData.mood
  
    const moodData = await moodFinder(mood);
    const ids: string[] = formData.artistdata.map(artist => artist.id as string);
const idString: string = ids.join(', ');
const genre: string[] = formData.genre.map(artist => artist.value as string);
const genreString: string = genre.join(', ');
const combinedObject = {   seed_artists: idString, seed_genres: genreString, ...moodData  };
const accessToken:string = await getAccessToken()
const recommend = await getRecommendations(accessToken,combinedObject);
const userId:string = "316ydrn5bebiejqm2b7wmohgrxsm"
const PlaylistId:string = await createPlaylist(accessToken, userId, formData.playlistName)
const trackUris:string[] = await recommend.tracks.map((track:Track) => track.uri);

await addTracksToPlaylist(accessToken,PlaylistId,trackUris)



  


   


  revalidatePath("/")
    return PlaylistId ;
  }