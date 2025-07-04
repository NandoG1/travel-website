import AXIOS_API from "@/utils/axiosAPI";

export async function getMostReservedListings(){
    const {data} = await AXIOS_API.get("/admin/listing/most-reversed");

    if(data){
        const {data: base64} = await AXIOS_API.get(`/base64?url=${data.imageUrls[0]}`)
        data.blurredImage = base64
        return data;
    }

}

export async function postImages(cloudName:string, formData:any){
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    const data = await res.json()

    const imageUrl = data["secure_url"];

    return imageUrl

}

export async function createNewlisting(data:any, imageUrls:any){
    const {data : newListing} = await AXIOS_API.post("/listing", {...data, imageUrls})

    return newListing;
}