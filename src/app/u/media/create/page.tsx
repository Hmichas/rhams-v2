"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
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
import { MediaTypes } from '@/shared/media';

const formSchema = z.object({
  thumbnail: z.string(),
  publicationDate: z.date(),
  title: z.string(),
  location: z.string(),
  authors: z.string().nonempty(),
  mediaSources: z.string().nonempty(),
  MediaTypes: z.string(),
  url: z.string(),
  notes: z.string(),
})

export default function CreateMediaClip() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}
  const handleSubmit = () => {}
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema)});
    defaultValues: {
      thumbnail: ''
      publicationDate: new Date()
      title: ''
      location: ''
      authors: ''
      mediaSources: ''
      mediaTypes: ''
      url: ''
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
                          <FormLabel></FormLabel>
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
            name="publicationDate" 
            render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
            <FormLabel>Publication Date</FormLabel>
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
                      <span>Pick a date</span>
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
            name="title" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />
          </div>{/* end of column 1 */}
                  {/*////////////////////////////////////start of column 2//////////////////////////////////////////////////////////// */}
          <div className="space-y-4">
          <FormField 
            control={form.control} 
            name="location" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="city, state, country" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />
          
          
          <FormField 
            control={form.control} 
            name="authors" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Authors</FormLabel>
                        <FormControl>
                          <Input placeholder="authors" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />

          </div>
          <div className="space-y-4">
                      <FormField 
                        control={form.control} 
                        name="mediaSources" 
                        render={({ field }) => {
                                return (
                                  <FormItem>
                                    <FormLabel>Media Sources</FormLabel>
                                    <FormControl>
                                      <Input placeholder="media sources" type="string"{...field} />
                                    </FormControl>
                                    <FormMessage/>
                                  </FormItem>
                                );
                              }}
                      />
          
          <FormField 
            control={form.control} 
            name="MediaTypes" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                        <select {...field} className="appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                          <option value="">Select Media Type</option>
                          {Object.entries(MediaTypes).map(([key, value]) => (
                            <option key={key} value={value}>{value}</option>
                          ))}
                        </select>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}/>
          </div> {/*end of column 3 */}
          </div>{/*end of grid */}

          {/* Biographies and Notes are full width and stacked */}
      <div className="">
      
        
        <FormField 
          control={form.control} 
          name="notes" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional notes"
                  className="resize- w-1/3 h-20 bg-white" // Adjust height as necessary
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
        <button  onClick={() => router.push('/u/users')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/media')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
