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

const formSchema = z.object({
  title: z.string().nonempty(),
  venueNames: z.string().nonempty(),
  location: z.string(),
  loadInDate: z.date(),
  startDate: z.date(),
  acquisitionDate: z.date(),
  notes: z.string(),
})

export default function CreateExhibition() {
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
      venueNames: ''
      location: ''
      loadInDate: ''
      startDate: ''
      acquisitionDate: ''
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
       <Form {...form}>
      <div className="bg-white p-4">
      <form onSubmit={form.handleSubmit(handleSubmit)}
     className="">
      <div className="grid grid-cols-3 gap-4">
         {/*////////////////////////////////////start of column 1//////////////////////////////////////////////////////////// */}
          <div className="space-y-4">
          <FormField 
            control={form.control} 
            name="title" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="title of exhibition" type="string"{...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    );
                  }}
          />

          <FormField 
            control={form.control} 
            name="venueNames" 
            render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input placeholder="name of owner" type="string"{...field} />
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
            name="loadInDate" 
            render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
            <FormLabel>Load In Date</FormLabel>
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
                      <span>choose a date</span>
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
          
          </div>
          {/*///////////////////////////////////////////////////////////////Start of Column 3///////////////////////////////////////////////////// */}
          <div className="space-y-4">
                      
          <FormField 
            control={form.control} 
            name="startDate" 
            render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
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
                      <span>choose a date</span>
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
            name="acquisitionDate" 
            render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
            <FormLabel>Acquisition Date</FormLabel>
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
                      <span>choose a date</span>
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
      
    
  
      {/* Bottom Table Section */}
      <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-100">
      {/* Export to Excel Placeholder */}
      <div className="bg-green-200 p-2 text-sm">Export to Excel Placeholder</div>

      {/* Search Placeholder */}
      <div className="flex items-center bg-white border rounded overflow-hidden">
        <input
          className="px-4 py-2"
          placeholder="Add Artwork by Title or File #"
        />
        <button className="bg-green-500 p-2">
          {/* Placeholder for the search icon */}
        </button>
      </div>
    </div>
        <div className="bg-gray-300 h-72  p-4">Table Placeholder</div>
      </div>
    </div>
      <div className="flex flex-row justify-end gap-6 p-32">
        <button  onClick={() => router.push('/u/media')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Next page
        </button>
        <button  onClick={() => router.push('/u/exhibitions')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-lg" type="button">
            Back
        </button>
      </div>
    </div>
  );
};
