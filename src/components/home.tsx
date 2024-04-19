import * as React from "react"
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function Hero() {
  return (                                
    <Card className=" w-full md:w-6/12">
      <CardHeader>
        <CardTitle className="md:text-5xl text-2xl">your unique spotify mix, powered by your mood</CardTitle>
        <CardDescription className="md:text-lg ">turn your mood into the perfect spotify ai playlist</CardDescription>
      </CardHeader>
      <CardContent>
      explore the power of ai in crafting personalized spotify playlists based on your mood, 
      vibe or thoughts. share your music preferences and let our playlist generator
      curate a soundtrack that evolves with your tastes and 
      craft spotify ai playlists tailored for you. start your customized music journey today!
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size='lg' className="text-lg border-dashed border-white" variant="outline"><Link href="/moodmix">start</Link></Button>
       
      </CardFooter>
    </Card>
  )
}
