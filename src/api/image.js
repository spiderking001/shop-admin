import axios from '@/axios'

export function getImageList(id,page=1) {
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}

export function updateImageList(id, data) {
    return axios.post("/admin/image/" + id, data)
}


export function deleteImageList(ids) {
    return axios.post(`/admin/image/delete_all`,{ids})
}

export const uploadImageAction="/api/admin/image/upload"

