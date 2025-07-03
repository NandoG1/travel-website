import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod"

const schema = z.object({
    location: z.enum(optionLocations.map(({ value }) => value) as [string, ...string[]]),
    min_price: z.number().min(10000, { message: "Price cant be less than 10000!" }),
    max_price: z.number().max(10000000, { message: "Price cant exceed more than 10000000" }),
    type: z.enum(optionTypes.map(({ value }) => value) as [string, ...string[]])
})

export {
    schema
}