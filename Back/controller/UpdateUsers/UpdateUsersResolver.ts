import { prisma } from "../../Client"

const Mutation = {
    AtualizarUsuario: async (_, { id, data }) => {

        const { access_id, name, email, phone } = data

        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                phone: phone,
                permissao: {
                    connect: { id: access_id }
                }
            },
            include: {
                permissao: true
            }
        })
    }
}



export { Mutation }