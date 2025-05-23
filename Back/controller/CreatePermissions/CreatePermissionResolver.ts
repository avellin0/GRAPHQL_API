import {prisma} from "../../prisma/index"

 
const Mutation = {
    createPermission: async(_,{data}) => {
        const {id, name} = data

        return await prisma.permissoes.create({
            data: {
                permission_id: id,
                name
            }
        })

    }
 
    }


export {Mutation}
