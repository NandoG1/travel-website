import { optionLocations, optionTypes } from "@/data/data";

import {z} from "zod"

const schema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    desc: z.string().min(1, {message: "Desc is required"}),
    beds: z.number().min(1, {message: "Beds is required"}),
    hasFreeWifi: z.boolean().optional(),
    type: z.string().min(1, {message: "Property type is required"}),
    location: z.string().min(1, {message: "Location is required"}),
    pricePerNight: z.number().min(10000, {message: "Price must be above 50000"}).max(10000000, {message: "Price must be lower 10000000"})
})  

export{
    schema
}