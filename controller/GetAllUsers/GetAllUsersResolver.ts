import {listaPermissao,listaUsuarios,SetNewUsers} from "../../db/database"

const Usuario = {
    permissao(args: any){
        console.log(args);
        return listaPermissao.find((permission) => permission.id === args.permissao_id)
    }
}

const Query = {
 
    usuario(_,args){
            return listaUsuarios.find((usuario) => usuario.id === args.id)
        },
    
    usuarios(){
        return listaUsuarios
    }
}  

export {Query, Usuario}