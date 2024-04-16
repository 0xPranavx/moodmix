import OpenAI from "openai";



import { msg, user } from "@/data/prompt";
import { revalidatePath } from "next/cache";




const openai = new OpenAI(process.env.OPENAI_API_KEY);



export default async function moodFinder(mood) {
  const user = mood
  const userr = String(user)
  const messages = [
    {
     role: "system",
     content : msg ,
    },
   
    
     {
       role : "user",
       content: userr,
     }
   
   ] 
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
    // response_format:{ "type": "json_object" },
  });

  const data = JSON.parse(completion.choices[0].message.content);
  
  revalidatePath('/');
  // console.log(data)
  return data
}
