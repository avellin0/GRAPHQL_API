import {sign} from "jsonwebtoken"


export async function CreateRefresh(data: {user_refresh: string}){

    const token = sign({
        expireIn: 1,
        User: {},
        userId: data.user_refresh
    },"MY_SECRET_KEY",{
        algorithm: "HS256",
        expiresIn: "30s"
    })

    return token

}
