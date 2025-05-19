import {GraphQLError} from "graphql"
import {sign} from "jsonwebtoken"
import { prisma } from "../../prisma"

const Mutation = {
    criarUsuario: async(_, {data}) => {
        const {email,name,phone,access} = data

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
            name,
            email,
            phone,
            access
            },'MY_REFRESH_KEY',{
                algorithm: "HS256",
                expiresIn: "30d"
            })

            String(RefreshToken)
            
            

        if(!RefreshToken){
            throw new Error("Não foi possivel criar um refreshtoken")
        }



        return await prisma.user.create({
            data: {
                name,
                email,
                phone,
                refresh_token: {
                    create: {
                        expireIn: 30,
                        token: RefreshToken
                    }
                }
            },
            include: {
                frind_info: true
            }              
        })
    },
}


export {Mutation}