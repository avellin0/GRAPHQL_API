import {GraphQLError} from "graphql"
import {sign} from "jsonwebtoken"
import { prisma } from "../../prisma"

const Mutation = {
    criarUsuario: async(_, {data}) => {
        const {id,email,name,phone,access} = data

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



        const RefreshToken = sign({
            token_id: id,
            name,
            email,
            phone,
            access
            },'MY_REFRESH_KEY',{
                algorithm: "HS256",
                expiresIn: "30d"
            })

        

        return await prisma.user.create({
            data: {
                refresh_token: {
                    connect: {
                        userId: RefreshToken
                    }
                },
                name,
                email,
                phone,
                permissao: {
                    connect: {
                        id: 1,
                        name: "user"
                    }
                }
            },
            include: {
                permissao: true,
                frind_info: true
            }              
        })
    },
}


export {Mutation}