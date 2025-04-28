import {listaUsuarios, SetNewUsers} from "../../db/database"

const Mutation = {
    deleteUser(_:any, {filter: {id }}){
        const usuario =  listaUsuarios.find((u) => u.id === id )
        const novosUsuarios = listaUsuarios.filter((u) => u.id !== id)
        SetNewUsers(novosUsuarios)

        
        return !!usuario
    }
}



export {Mutation}