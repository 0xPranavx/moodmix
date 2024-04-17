'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm  } from 'react-hook-form';
import * as z from 'zod';
import * as React from 'react';

import searchArtist from '@/server/actions/search-artist';
import {  
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription

} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

import MultipleSelector, { Option } from '@/components/ui/multi-selector';

import { FloatingLabelInput } from '@/components/input';
import { AutosizeTextarea } from '@/components/text-area';
import { LoadingButton } from '@/components/loading-button';
import formdata from '@/server/actions/formdata';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { genreOptions } from '@/data/genre';



const optionSchema = z.object({

  value: z.string(),
  label : z.string(),
  disable: z.boolean().optional(),
  id:z.string().optional(),
 
  
});

const FormSchema = z.object({
  artistdata: z.array(optionSchema).min(1),
  playlistName: z.string().min(2, {
    message: 'name must be at least 2 characters.',
    
  }),
  mood: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
  genre:z.array(optionSchema).min(1),
});



const MultipleSelectorWithForm = () => {
 
  const[playlist, setplaylist] = React.useState<string>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { 
      playlistName: '',
      mood : '',
      
     },
    mode: 'onTouched',
  });
  const [isTriggered, setIsTriggered] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

 async  function onSubmit(data: z.infer<typeof FormSchema>) {
  event?.preventDefault();
    setLoading(true);
   const  playlistId:string = await formdata(data);
   setplaylist(playlistId);
   const jsonString = JSON.stringify(playlistId);
      
    toast({
      title: 'Your submitted data',
      description: (
    
         <p>playlist created</p>
        
      ),
    });
      setLoading(false);
      
  

    
    console.log(data);

  
  
    
  }
  


  return (
    <>
   
    { !playlist &&<Card className='mx-8 mt-8 w-full'>
     <CardHeader>
       <CardTitle>moodmix</CardTitle>
       <CardDescription>Turn your mood or thought in perfect playlist </CardDescription>
     </CardHeader>
     <CardContent>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="mood">mood</FormLabel>
              <FormDescription>describe the mood, vibe or any thought.</FormDescription>
              <FormControl>
                <AutosizeTextarea id="mood" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>genre</FormLabel>
              <FormDescription>choose 2 genres according to your mood.</FormDescription>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={genreOptions}
                  placeholder="genre.."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="artistdata"
          render={({ field }) => (
            <FormItem>
              <FormLabel>artist</FormLabel>
              <FormDescription>choose maximum 3 artist .</FormDescription>
              <FormControl>
                <MultipleSelector
                onSearch={async (value) => {
                  setIsTriggered(true);
                  const res = await searchArtist(value);
                  setIsTriggered(false);
                  return res;
                }}
                  value={field.value}
                  onChange={field.onChange}
                  // defaultOptions={OPTIONS}
                  placeholder="Artist.."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="playlistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>playlist name</FormLabel>
              <FormDescription>add cool name to your playlist.</FormDescription>
              <FloatingLabelInput {...field} id="name"  className='h-10  ' />
            
              <FormMessage />
            </FormItem>
          )}
        />
        
         
             
       <LoadingButton loading={loading} type="submit">
          Generate
        </LoadingButton>
      </form>
    </Form>
      
   </CardContent>
     
    
   </Card>
}

  {playlist && 
   <div className='m-8 w-full'>
<iframe className="rounded-xl" src={`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`} width="100%" height="352" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</div>
  
   
   
}
   </>
    
  );
};
export default MultipleSelectorWithForm;
