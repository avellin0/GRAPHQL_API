import {GraphQLError} from "graphql"
import { prisma } from "../../prisma"

const Mutation = {
    criarUsuario: async(_, {data}) => {
        const {email,name,phone} = data
        
        const UsuarioExiste = await prisma.user.findFirst({
            where: {
                email: email as string
            }
        })


        if(!UsuarioExiste){
            console.log("Welcome")
        }else{
            throw new GraphQLError("Usuario já existente", {
                extensions: {
                    code: "BAD_USER_INPUT",
                    argumentName: "essa porra mermo"
                }
            })
        }

        return await prisma.user.create({
            data: {
                name,
                email,
                phone,
            },
            include: {
                permissao: true
            }              
        })
    },
}


export {Mutation}