import { verify } from "jsonwebtoken"
import {prisma} from "../../prisma/index"
import { CreateRefresh } from "../RefreshToken/CreateRefresh"

export async function Middleware(email: string, token: string){
    try{

            interface DecodedToken {
                token_id: String,
                name: String
                email: String
                phone: String
                access: String
            }

                const refreshToken = await prisma.user.findFirst({
                    where: {
                        email: email
                    },
                    include: {
                        refresh_token: true
                    }                
                })

                console.log(refreshToken);
                

                if (!refreshToken) {
                    throw new Error("Usuario não possui refresh Token")
                }

                const user_refresh = String(refreshToken?.refresh_token?.userId)
           
            try {
                 
                verify(token, "MY_SECRET_KEY") as DecodedToken

                console.log(token,email);
                

                return await prisma.user.findFirst({
                    where: {
                        email: email
                    },
                    include: {
                        permissao: true
                    }
                })
            


            }catch (err) {
                const new_token = await CreateRefresh(user_refresh)

                return {
                    message: "Token expirado. Novo token gerado.",
                    token: new_token,
                  };
            }
            
    }catch(err){
        console.log("This is the error:", err);
        throw new Error(err)
    }
}