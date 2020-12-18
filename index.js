'use strict';

const { ApolloServer } = require('apollo-server');
const resolvers = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');

require('dotenv').config()


const server = new ApolloServer({
    typeDefs,
    resolvers,
    // trace to check the performance --- Apollo Studio
    tracing: true
});

const port = process.env.DB_PORT_NUM || 8000;

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});