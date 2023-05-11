import axios from "axios";
const signup = process.env.signup
const signin = process.env.signin

export async function userSignup(data) {
    return axios.post(signup,data)
}
export async function userSignIn(data) {
    return axios.post(signin,data)
}
