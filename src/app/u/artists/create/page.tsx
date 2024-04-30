"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import Creatable from 'react-select/creatable';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import e from 'express';
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"


const formSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  birthDate: z.date(),
  birthLocation: z.string(),
  deathDate: z.date(),
  deathLocation: z.string(),
  placesLived: z.string(),
  thumbnail: z.string(),
  website: z.string(),
  bio: z.string(),
  exhibitions: z.string(),
  notes: z.string(),
})


export default function CreateArtist() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}
  const handleSubmit = () => {}
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema)});
    defaultValues: {
      firstName: ''
      lastName: ''
      birthDate: ''
      birthLocation: ''
      deathDate:  ''
      deathLocation: ''
      placesLived: ''
      thumbnail: ''
      website: ''
      bio: ''
      notes: ''
    }
  
  function reformatTitle(input: string) 
  {return input.charAt(0).toUpperCase() + input.slice(1);}
  
  useEffect(() => 
  {
    if (pathname)   
    {
      const parts = pathname.split('/');
      setSlug(reformatTitle(parts[3]) + ' ' + reformatTitle(parts[2]));
    }
  }, [pathname]);
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
      {slug || 'Loading...'}
      </h1>
      <div className="container mx-auto p-6">
      <div className="flex gap-4">
        {/* Image Upload Placeholder */}
        <div className="flex flex-col items-center bg-gray-200 p-4 w-1/4 text-center">
          <div className="bg-gray-400 p-24 mb-4">Image Placeholder</div>
        <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)}
         className="max-w-md w-full flex flex-col gap-4">
            <FormField 
              control={form.control} 
              name="thumbnail" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Image URL" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />
            <Button type="submit" className="w-full">Upload</Button>
          </form>
</Form>             	
        </div>
        
        <Form {...form}>
        <div className="bg-white p-4">
        <form onSubmit={form.handleSubmit(handleSubmit)}
       className="">
        <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4">
            <FormField 
              control={form.control} 
              name="firstName" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />

            <FormField 
              control={form.control} 
              name="lastName" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />
            
            <FormField 
              control={form.control} 
              name="placesLived" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Places Lived</FormLabel>
                          <FormControl>
                            <Input placeholder="Places Lived" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />

            
            </div>{/* end of column 1 */}
            <div className="space-y-4">
            <FormField 
              control={form.control} 
              name="birthDate" 
              render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choose a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {/* date of birth  */}
              </FormDescription>
              <FormMessage />
            </FormItem>
                      );
                    }}
            />
            <FormField 
              control={form.control} 
              name="birthLocation" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Place of Birth</FormLabel>
                          <FormControl>
                            <Input placeholder="Place of Birth" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />

            <FormField 
              control={form.control} 
              name="deathDate" 
              render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col">
              <FormLabel>Date of Death</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choose a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {/* date of death  */}
              </FormDescription>
              <FormMessage />
            </FormItem>
                      );
                    }}
            />
            
            </div>{/*end of column 2 */}
            <div className="space-y-4">
            <FormField 
              control={form.control} 
              name="deathLocation" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Place of Death</FormLabel>
                          <FormControl>
                            <Input placeholder="Place of Death" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />

<FormField 
              control={form.control} 
              name="website" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="Website" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />
            
            <FormField 
              control={form.control} 
              name="exhibitions" 
              render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Exhibitions Placeholder</FormLabel>
                          <FormControl>
                            <Input placeholder="Exhibitions" type="string"{...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      );
                    }}
            />
            </div>{/*end of column 3 */}
            </div>{/*end of grid */}
            {/* Biographies and Notes are full width and stacked */}
        <div className="mb-4">
          <FormField 
            control={form.control} 
            name="bio" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="About the artist's life and work"
                    className=" w-1/2 h-20 bg-white" // Adjust height as necessary
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />        
          
          <FormField 
            control={form.control} 
            name="notes" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional notes"
                    className="resize- w-1/2 h-20 bg-white" // Adjust height as necessary
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 flex justify-center md:justify-end">
          <Button type="submit" className="">
            Save Record
          </Button>
        </div>
                </form>
                
                </div>
                
        </Form>
        
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/artworks')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/artists')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
