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