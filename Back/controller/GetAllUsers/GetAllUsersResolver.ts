import { prisma } from "../../prisma/index"
import { verify } from "jsonwebtoken"

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
    usuario: async (_, args) => {

    try{
    
        const { id, token } = args

        interface DecodedToken {
            token: String
            userId: String
            access: String
        }

        const Refresh_Validate = await prisma.user.findFirst({
            where: {
                id: id
            },
            select: { refresh_token: true }
        })

        const refresh = Refresh_Validate?.refresh_token

        if (!refresh) {
            throw new Error("Usuário não tem refresh_token válido");
        }

        console.log("refresh que vem do banco:", refresh);
        const HasUser = verify(token, "MY_SECRET_KEY") as DecodedToken;
        console.log("HasUser:", HasUser);

        const HasRefresh = verify(refresh, "MY_REFRESH_KEY") as DecodedToken;
        console.log("HasRefresh:", HasRefresh);



        if (!HasUser || HasUser.access !== "Admin") {
            const mutation = `
                mutation CreateUser($token: String!, $access: String!, $access_id: String!) {
                    JWT(refresh_token: $token, access: $access, access_id: $access_id) {
                        token
                        access
                        access_id
                    }
                }
                `

            const variable = {
                token: refresh,
                access: "admin",
                access_id: "3"
            }

            const response = await fetch("http://localhost:4000/", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: mutation,
                    variables: variable
                })
            })

            const new_token = await response.json()
            console.log("novo token", new_token);


            return new_token.data
        }



        return await prisma.user.findFirst({
            where: {
                id: id
            },
            include: {
                permissao: true
            }
        })

        }catch(err){
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