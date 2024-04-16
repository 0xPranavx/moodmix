"use server"
import { Option } from "@/components/ui/multi-selector";
import { revalidatePath } from "next/cache";
import getAccessToken from "@/server/access";
interface ArtistData {
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
export default async function searchArtist(value: string):  Promise<Option[]> {
  const query = encodeURIComponent(value);
  

 const token = await getAccessToken();
 console.log(token)

   // Ensure query is URL-encoded

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=2`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use your access token here
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const options: ArtistData[] = data.artists.items;
    const extract: Option[] = [];

    options.forEach((item: ArtistData) => {
      extract.push({
        value: item.name,
        img: item.images[0]?.url || '', // Use optional chaining and fallback to empty string
        label: item.genres.length > 0 ? item.genres.join(', ') : 'No genre specified',
        id: item.id,
      });
    });
     revalidatePath('/')
     console.log(extract);
    return extract;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
