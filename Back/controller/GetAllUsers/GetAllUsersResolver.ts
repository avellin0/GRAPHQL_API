import { prisma } from "../../prisma/index"
import { verify } from "jsonwebtoken"
import { CreateRefresh } from "../RefreshToken/CreateRefresh"

const Usuario = {
    permissao: async (args: any) => {

        const { permissao } = args
        console.log("permissão:", permissao[0].id);

        console.log("isso que recebo das permissões:", args);

        return await prisma.permissoes.findUnique({
            where: {
                id: permissao[0].id
            }

        })
    }
}

const Query = {
    usuario: async (_, { data }) => {

        try {

            let { email, token } = data

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
                    select: { refresh_token: true }
                })

                if (!refreshToken) {
                    throw new Error("Usuario não possui refresh Token")
                }

                const user_refresh = refreshToken.refresh_token
           
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
                const new_token = await CreateRefresh({ user_refresh })
                return {
                    message: "Token expirado. Novo token gerado.",
                    token: new_token
                  };
            }


        } catch (err) {
            console.error("Erro ao verificar token:", err.message);
            throw new Error("Token inválido ou expirado.");
        }
    },

    usuarios: async () => {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            }
        })
    }
}

export { Query, Usuario }