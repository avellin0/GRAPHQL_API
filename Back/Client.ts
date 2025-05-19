import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"
import {loadFilesSync} from "@graphql-tools/load-files"
import path, {dirname} from "path"
import { fileURLToPath } from "url"
import { CreateRefresh } from "./controller/RefreshToken/CreateRefresh"
import jwt from "jsonwebtoken"
import { Middleware} from "./controller/Middleware/Middleware2"

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

const middleware = new Middleware()


const url = await startStandaloneServer(server)
console.log("server is running at port:", url);
