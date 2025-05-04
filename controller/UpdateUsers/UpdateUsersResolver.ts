import {prisma} from "../../prisma"

const Mutation = {
    AtualizarUsuario: async(_, {id, data}) => {

        const {name, email, phone} = data

        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                phone: phone
            }
        })
    }
}



export {Mutation}