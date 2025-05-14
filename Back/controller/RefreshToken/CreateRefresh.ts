import jwt from "jsonwebtoken"


export async function CreateRefresh(user_refresh: string){
 
    const token = jwt.sign({
        expireIn: 1,
        User: {},
        userId: user_refresh
    },"MY_SECRET_KEY",{
        algorithm: "HS256",
        expiresIn: "30s"
    })

    return token

}
