import axios from "@/axios.js";
 
export function login(username, password) {
    return axios.post("/admin/login", {
        username,
        password
    });
}

export function getInfo() {
    return axios.post("/admin/getinfo");
}
//
export function logout() {
    return axios.post("/admin/logout")
}
export function updatePassword(data) {
    return axios.post("/admin/updatepassword", data);
}

export function getAdminList(page,query={}) {
    let q=[]
    for (let key in query){
        if (query[key]){
            q.push(`${key}=${query[key]}`)
        }
    }
    let r=q.join("&")
    r=r?("?"+r):""
    return axios.get(`/admin/manager/${page}${r}`);
}

export function updateAdminStatus(id,status) {
    return axios.post(`admin/manager/${id}/update_status`,{status});
}

export function addAdmin(data) {
    return axios.post("/admin/manager",data)
}

export function editAdmin(id,data) {
    return axios.post(`/admin/manager/${id}`,data)
}

export function deleteAdmin(id) {
    return axios.post(`admin/manager/${id}/delete`)
}
