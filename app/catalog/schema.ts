import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod";

const schema = z.object({
    location: z.string().optional().default(""),
    min_price: z.number().min(0, { message: "Price can't be negative!" }).default(0),
    max_price: z.number().max(10000000, { message: "Price can't exceed 10,000,000" }).default(10000000),
    type: z.string().optional().default("")
}).refine((data) => {
    return data.max_price >= data.min_price;
}, {
    message: "Maximum price must be greater than minimum price",
    path: ["max_price"]
});

export { schema };