import { sign } from "jsonwebtoken"

const Mutation = {
    JWT: async (_, { data }) => {

        const {refresh_token,access_id, access} = data;


        if(!refresh_token){
            throw new Error("Token do usuario obrigatorio") 
        }

        console.log(data.id);

        const token = sign({
            userId: access_id,
            user_token: refresh_token,
            access: access
        }, "MY_SECRET_KEY", {
            algorithm: "HS256",
            expiresIn: "30s"
        })

 

        const user = {
            token,
            access_id,
            access
        }

        return user

    }
}

export { Mutation }