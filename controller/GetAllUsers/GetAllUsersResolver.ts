import {listaPermissao,listaUsuarios,SetNewUsers} from "../../db/database"
import {prisma} from "../../prisma/index"

const Usuario = {
    permissao: async(args: any) =>{
        console.log(args);

        return prisma.permissoes.findMany({
            where: {
                User: {
                    some: {id: args.id}
                }    
            }
        })
    }
}

const Query = {
 
    usuario: async(_,args) => {
            return await prisma.user.findFirst({
                where: {
                    id: args.id
                }
            })
        },
    
    usuarios: async() => {
        return prisma.user.findMany()
    }
}  

export {Query, Usuario}