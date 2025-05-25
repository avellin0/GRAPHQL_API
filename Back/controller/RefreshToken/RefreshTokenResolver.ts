import { CreateRefresh } from "./CreateRefresh";
import {prisma} from "./CreateRefresh"

const Mutation = {
    refreshToken: async (_, { data }) => {

        const { user_id } = data
            console.log(user_id);


        const token = await CreateRefresh(user_id)

        const user = {
            expireIn: 3000,
            User: {},
            userId: user_id,
            token
        }

        return await prisma.refreshToken.create({
            data: user
        })
    }
}

export default { Mutation }