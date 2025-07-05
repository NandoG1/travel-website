import AXIOS_API from "@/utils/axiosAPI";

export async function getFilteredListings(values:any) {
    const params = new URLSearchParams({
        location: values.location || '',
        min_price: values.min_price?.toString() || '0',
        max_price: values.max_price?.toString() || '10000000',
        type: values.type || ''
    });
    
    const url = `/listing/filter?${params}`;
    const { data } = await AXIOS_API.get(url);
    
    if (data && data.length > 0) {
        // Only get blurred images for the first few listings to improve performance
        const blurredImages = await Promise.all(
            data.slice(0, 5).map((listing:any) => 
                AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`)
                    .catch(() => ({ data: null })) // Handle errors gracefully
            )
        );
        
        const filteredHotels = data.map((listing:any, idx:any) => {
            const blurredImage = idx < 5 ? blurredImages[idx]?.data : null;
            return { ...listing, blurredImage };
        });
        
        return filteredHotels;
    }
    
    return [];
}