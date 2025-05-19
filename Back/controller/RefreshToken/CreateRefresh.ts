import jwt from "jsonwebtoken"


export async function CreateRefresh(user_id: string){
 
    const token = jwt.sign({
        expireIn: 1,
        User: {},
        userId: user_id
    },"MY_SECRET_KEY",{
        algorithm: "HS256",
        expiresIn: "30d"
    })

    

    return token

}
