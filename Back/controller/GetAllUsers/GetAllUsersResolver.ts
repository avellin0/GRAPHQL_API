import {prisma} from "../../prisma/index"
import {verify} from "jsonwebtoken"

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

        const {id,token} = args

        interface DecodedToken {
            userId: String
            access: String
        }

        const HasUser = verify(token, "jfkdjsldks") as DecodedToken

        console.log("esse é o usuario:", HasUser);
        

        if(!HasUser || HasUser.access !== "Admin"){
            throw new Error("Usuario não permitido")
        }

            return await prisma.user.findFirst({
                where: {
                    id: id
                }
            })
        },
    
    usuarios: async() => {
        return prisma.user.findMany()
    }
}  

export {Query, Usuario}