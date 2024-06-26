"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import React from 'react';
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
import { Checkbox } from "@/components/ui/checkbox"
import { Mediums, Types } from '@/shared/artwork';



const formSchema = z.object({
  catalogNumber: z.number(),
  title: z.string().min(1),
  artist: z.string().min(1),
  releaseDate: z.date(),
  thumbnail: z.string(),
  description: z.string(),
  types: z.string(),
  Mediums: z.string(),
  measurements: z.string(),
  numEditions: z.number(),
  notes: z.string(),
  inPortfolioBook: z.boolean(),
})



export default function CreateArtwork() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const pathname = usePathname();
  const imageLoader = ({src}: {src: string}) => {return `https://via.placeholder.com/${src}`}
  const handleSubmit = () => {}
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema)});
    defaultValues: {
      title: ''
      artist: ''
      thumbnail: ''
      releaseDate: new Date()
      description: ''
      types: ''
      mediums: ''
      measurements: ''
      numEditions: ''
      notes: ''
      inPortfolioBook: false
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
            name="catalogNumber" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Catalog Number</FormLabel>
                        <FormControl>
                          <Input placeholder="catalog number" type="number"{...field} />
                        </FormControl>
                        <FormMessage/>
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

          <FormField 
            control={form.control} 
            name="artist" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Artist</FormLabel>
                        <FormControl>
                          <Input placeholder="Artist" type="string"{...field} />
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
            name="releaseDate" 
            render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
            <FormLabel>Release Date</FormLabel>
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
            name="types" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                        <select {...field} className="appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                          <option value="">Select Type</option>
                          {Object.entries(Types).map(([key, value]) => (
                            <option key={key} value={value}>{value}</option>
                          ))}
                        </select>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}/>

<FormField 
            control={form.control} 
            name="numEditions" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Number of Editions</FormLabel>
                        <FormControl>
                          <Input placeholder="# of editions" type="number"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />

          </div>
          {/*end of column 2 */}
          {/*////////////////////////////////////start of column 3//////////////////////////////////////////////////////////// */}
          <div className="space-y-4">
          <FormField 
            control={form.control} 
            name="Mediums" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                        <select {...field} className="appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                          <option value="">Select Medium</option>
                          {Object.entries(Mediums).map(([key, value]) => (
                            <option key={key} value={value}>{value}</option>
                          ))}
                        </select>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}/>
          
          <FormField 
            control={form.control} 
            name="measurements" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Measurements</FormLabel>
                        <FormControl>
                          <Input placeholder="Measurements" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />
          
          <FormField 
            control={form.control} 
            name="inPortfolioBook" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="p-4">
                          In Portfolio Book
                        </FormLabel>
                        <FormControl>
                          <Checkbox  />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}></FormField>
          </div> {/*end of column 3 */}
          </div>{/*end of grid */}

          {/* Biographies and Notes are full width and stacked */}
      <div className="mb-4">
        <FormField 
          control={form.control} 
          name="description" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
        <button  onClick={() => router.push('/u/collections')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/artworks')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
