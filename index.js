import express from 'express'
import {
    ApolloServer
} from 'apollo-server-express'
import models from './models'
import jwt from 'jsonwebtoken';
import {
    fileLoader,
    mergeResolvers,
    mergeTypes
} from 'merge-graphql-schemas';
import path from 'path'
import cors from 'cors'

const SECRET = 'asiodfhoi1hoi23jnl1kejd';
const SECRET2 = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))

const app = express()
app.use(cors())
const getUser = token=>{
    let user={}
    try{
        user = jwt.verify(token,SECRET).user
    }catch(err){
        user={id:1}
    }
    return user
}

app.use(express.static('public'))

const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({
        req
    }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';

        // try to retrieve a user with the token
        const user = getUser(token);
        console.log("herel=token",token,"end token")
        // add the user to the context
        return {
            models, 
            user,
            SECRET,
            SECRET2,
        };
    }
});

server.applyMiddleware({
    app
}); // app is from an existing express app


models.sequelize.sync({
}).then(() => {
    app.listen({
            port: 4000
        }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
});