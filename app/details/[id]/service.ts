import AXIOS_API from "@/utils/axiosAPI";

export async function getListingById(id:any) {
    const { data } = await AXIOS_API.get(`/listing/details/${id}`)

    if (data) {
        const { data: base64 } = await AXIOS_API.get(`/base64?url=${data.imageUrls[0]}`)
        data.blurredImage = base64
    }

    return data
}



export async function postReview(id:any, body:any) {
    const { data } = await AXIOS_API.post(`/review?id=${id}`, body)

    return data
}

export async function getReviewsByListing(id:any) {
    const { data } = await AXIOS_API.get(`/review/${id}`)

    return data
}