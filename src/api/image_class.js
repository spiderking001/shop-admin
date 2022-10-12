import axios from '@/axios'

export function getClassList(page) {
  return axios.get('/admin/image_class/'+page)
}

export function createClassList(data) {
  return axios.post('/admin/image_class',data)
}

export function updateClassList(id,data) {
  return axios.post('/admin/image_class/'+id,data)
}

export function deleteImageClass(id){
  return axios.post(`/admin/image_class/${id}/delete`)
}