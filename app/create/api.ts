import AXIOS_API from "@/utils/axiosAPI";

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