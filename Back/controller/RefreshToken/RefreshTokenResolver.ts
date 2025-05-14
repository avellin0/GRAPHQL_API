import {prisma} from "../../prisma/index"
import { CreateRefresh } from "./CreateRefresh";


const Mutation = {
    refreshToken: async (_, { data }) => {

        const { user_refresh } = data
            console.log(user_refresh);

        const HasThisUserToken = await prisma.user.findFirst({
            where: {
                refresh_token: user_refresh
            }
        })

        if(!HasThisUserToken){
            throw new Error("Refresh Token não encontrado")
        }

        const token = await CreateRefresh(user_refresh)

        const user = {
            expireIn: 3000,
            User: {},
            userId: user_refresh,
            token
        }
        
        console.log(token);

        return user
    }
}

export { Mutation }