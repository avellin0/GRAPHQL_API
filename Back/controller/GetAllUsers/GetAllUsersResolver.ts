import { prisma } from "../../prisma/index"
import { Middleware } from "../Middleware/Middleware";

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
    usuario: async (_, { data }, context: any) => {
        const {email, token} = data

        const teste = await Middleware(email,token)
        const newToken = context.new_token

        console.log(teste)  ;
        console.log("esse é o teste:", newToken);

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