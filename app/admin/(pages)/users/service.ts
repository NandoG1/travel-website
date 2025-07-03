import AXIOS_API from "@/utils/axiosAPI";

export async function deleteUser(id:any) {
    const { data } = await AXIOS_API.delete(`/admin/user/${id}`)

    return data
}