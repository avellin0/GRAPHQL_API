import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"
import {loadFilesSync} from "@graphql-tools/load-files"
import path, {dirname} from "path"
import { fileURLToPath } from "url"
import { CreateRefresh } from "./controller/RefreshToken/CreateRefresh"
import jwt from "jsonwebtoken"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const resolversFiles = loadFilesSync(path.join(__dirname, './controller/**/*Resolver.ts'))
const typeDefsFiles = loadFilesSync(path.join(__dirname, './controller/**/*.gql'))

const resolvers = mergeResolvers(resolversFiles)
const typeDefs = mergeTypeDefs(typeDefsFiles)


const schema = makeExecutableSchema({resolvers, typeDefs})

const server = new ApolloServer({
    schema
})

// const url = await startStandaloneServer(server,{
//     context: async ({ req}) => {

//         const token = String(req.headers.authorization)
//         const refreshToken = String(req.headers["refresh-token"])


//         let user:any;
//         let newToken:any;

//         try{
//             user = jwt.verify(token, 'MY_SECRET_KEY');
//         }catch(err){
//             if(!refreshToken || typeof(refreshToken) !== "string"){
//                 throw new Error("Não tem refreshToken")
//             }

//             newToken = await CreateRefresh(refreshToken)
//         }



//         return {
//           req,        
//           user, 
//           token: newToken ?? token, 
//         };
//       },
// })

const url = await startStandaloneServer(server)
console.log("server is running at port:", url);
