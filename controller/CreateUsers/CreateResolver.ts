import {listaPermissao,listaUsuarios,SetNewUsers} from "../../db/database"
import {GraphQLError} from "graphql"

function CreateId(lista: any[]){
    let user: number;
    const LastUser = lista[lista.length - 1]
    if(LastUser){
        user = LastUser.id
    }else{
        user = 0;
    }

    return ++user
}

const Mutation = {
    criarUsuario(_, {data}){
    
      const {email} = data
        

       const novoUsuario = {
        ...data,
        id: CreateId(listaUsuarios),
        permissao_id: 3,
        }


        const UsuarioExiste = listaUsuarios.some((u) => u.email === email)

        if(UsuarioExiste){
            throw new GraphQLError("Usuario já existente", {
                extensions: {
                    code: "BAD_USER_INPUT",
                    argumentName: "essa porra mermo"
                }
            })
        }


        listaUsuarios.push(novoUsuario)

       return novoUsuario
    }
}



export {Mutation}