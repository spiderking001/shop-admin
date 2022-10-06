import axios from "@/axios.js";

export function login(username, password) {
    return axios.post("/admin/login", {
        username,
        password
    });
}

export function getInfo(token) {
    return axios.post("/admin/getinfo", {
        params: {
            token
        }
    });
}