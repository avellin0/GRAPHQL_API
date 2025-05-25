import jwt from "jsonwebtoken"
import { prisma } from "../../prisma/index";

export {prisma}

export async function CreateRefresh(email: string){
 
    const user = await prisma.user.findFirst({
        where: {
          email,
        }
      });

    const token = jwt.sign({
        expireIn: 1,
        user,
    },"MY_SECRET_KEY",{
        algorithm: "HS256",
        expiresIn: "30d"
    })

    

    return token

}
