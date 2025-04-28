let listaUsuarios = [
    {id: 1, name: "Davi", email: "Davizin@gmail.com", age: 18, phone: "2112345678", permissao_id: 1, endereco_id: 1},
    {id: 2, name: "Wesley", email: "Davizin@gmail.com", age: 26, phone: "2112345678", permissao_id: 2, endereco_id: 2},
    {id: 3, name: "Cristiane", email: "Davizin@gmail.com", age: 44, phone: "2112345678", permissao_id: 3, endereco_id: 2},
    {id: 4, name: "Adriano", email: "Davizin@gmail.com", age: 43, phone: "2112345678", permissao_id: 3, endereco_id: 2},
    {id: 5, name: "Ruan Alvarez", email: "HijitoDePuta@gmail.com", age: 33, phone: "7070707070", permissao_id: 3, endereco_id: 5},
]


const listaEndereco = [    
    {
        id: 1,
        street: "Rua do solavanco",
        state: "Rj",
        country: "Brazil",
        post_code: "21890804",
    },
    {
        id: 2,
        street: "Rua belisario de souza",
        state: "Rj",
        country: "Brazil",
        post_code: "21890804",
    },
    {  
        id: 5,
        street: "Rua dos hijo de putas",
        state: "GBA",
        country: "Argentina",
        post_code: "65890804"
    }
]


const listaPermissao = [ 
    {id: 1, name: 'admin'},
    {id: 2, name: 'support'},
    {id: 3, name: 'user'}
]


export const SetNewUsers = (novosUsuarios: typeof listaUsuarios) => {   
    listaUsuarios = novosUsuarios;
}


export {listaUsuarios,listaEndereco,listaPermissao}