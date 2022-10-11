import axios from '@/axios'

export function getClassList(page) {
  return axios.get('/admin/image_class/'+page)
}

export function createClassList(data) {
  return axios.post('/admin/image_class',data)
}
