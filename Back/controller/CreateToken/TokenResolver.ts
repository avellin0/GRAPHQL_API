import {sign} from "jsonwebtoken"

const Mutation = {
    JWT: async(_,{data}) => {

        const {id,access} = data;
        
        console.log(data.id);
        
    const token = sign({
             userId: data.id,
             access: data.access
        },"jfkdjsldks",{
            algorithm: "HS256",
            expiresIn: "1h"
        })

        const user = {
            token,
            id,
            access
        }

        console.log(token);
        console.log(user)

        return user
    }
}

export {Mutation}