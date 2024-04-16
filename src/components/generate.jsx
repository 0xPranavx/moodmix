
"use client"
import searchArtist from "@/server/actions/search-artist";
export default function Generate(){
  function search(){
    searchArtist();
  }

    return(<button onClick={search}> generate</button>)
}