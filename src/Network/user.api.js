import fetchDataError from "../Utils/fetchDataWithError"

export async function registerUser(user) {
    const response = await fetchDataError("http://localhost:4000/user/signUp",
        {
            method: "POST",
            headers :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(user)
        }
    )
    return await response.json()
}

export async function getLogginUser() {
    const response = await fetchDataError("http://localhost:4000/user/",{method: "GET"})
    return await response.json()
}

export async function loginUser(user) {
    const response = await fetchDataError("http://localhost:4000/user/signIn",
        {
            method: "POST",
            headers :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                name: user.name,
                password: user.password
            })
        }
    )
    return await response.json()
}

export async function logoutUser() {
    const response = await fetchDataError("http://localhost:4000/user/logOut",{method: "POST"})
    return response
}
