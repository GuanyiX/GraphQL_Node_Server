'use strict';

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const GraphQLDateTime = require('graphql-type-datetime');

const mysql = require("mysql");


const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dx0310@im5x1',
    database: 'Breze'
});


const app = express();

const resolvers = {
    DateTime: GraphQLDateTime,
};

const schema = `
   type Query {
       getClients: [Client]
   }

   type Client {
       clientId: Int
       firstname: String
       surname: String
       fullname: String
       prefName: String
       phoneNumber: String
       email: String
       gender: String
       dob: String
       NDISNo: String
       MYOBCode: String
       MYOBAccName: String
       addressId: Int
       region: String
       referrer: String
       registrationNo: String
       disability: String
       disabilityNDISCode: String
       demographic: String
       coordinator: Int
       createdDT: DateTime
       createdUserId: Int
       lastUpdatedDT: DateTime
       lastupdatedUserId: Int
   }
`;

const typeDefs = ` scalar DateTime ` + schema;


const root = {
    getClients: () => {
        return new Promise((resolve, reject) => {
            pool.query('select * from client', (err, results) => {
                if (err) {
                    console.log("Something wrong");
                    return;
                }

                let res = JSON.parse(JSON.stringify(results))

                resolve(res)
            })

        })

    }
}

app.use(
    '/graphql',
    graphqlHTTP({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        rootValue: root,
        graphiql: true,
    }),
);

app.listen(8000, () => {
    console.log("Server starts to listen port 8000")
});