import {listaUsuarios} from "../../db/database"

const Mutation = {
    AtualizarUsuario(_, {id, data}){
        const usuario =  listaUsuarios.find((u) => u.id === id)
        const indice = listaUsuarios.findIndex((u) => u.id === id)

        const novoUsuario = {
            ...usuario, 
            ...data
        }

        listaUsuarios.splice(indice, 1, novoUsuario)
        
        return novoUsuario
    }
}



export {Mutation}