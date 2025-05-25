import {prisma} from "../../Client"

const Mutation = {
    deleteUser: async(_:any, {filter: {id,email}}) =>{
        const usuarioDeletado = await prisma.user.delete({
            where: {
                id: id,
                email: email
            }
        })
        
        return !!usuarioDeletado
    }
}



export {Mutation}