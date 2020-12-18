'use strict';

const { ApolloServer, gql } = require('apollo-server');
const GraphQLDateTime = require('graphql-type-datetime');

const mysql = require("mysql");

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dx0310@im5x1',
    database: 'Breze'
});

const typeDefs = gql`
  scalar DateTime

  type Query {
    getClients: [Client]
    getNotes(entityId: Int!): [Note]
  }

  type Mutation {
    createNote(input: NoteType!): Int
    updateNote(noteId: Int!, content: String!): Int
    deleteNote(noteId: Int!): Int
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
   
  type Note {
    noteId: Int
    category: String
    alert: Int
    entity: String
    entityId: Int
    focus: String
    focusId: Int
    content: String
    createdDT: DateTime
    createdUserId: Int
  }

  input NoteType {
    category: String
    alert: Int
    entity: String
    entityId: Int
    focus: String
    focusId: Int
    content: String
    createdUserId: Int 
  }
`;


const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
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

        },
        getNotes: (parent, args, context, info) => {
            const { entityId } = args;

            return new Promise((resolve, reject) => {
                pool.query('select * from note where entityId = ?', entityId, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    let res = JSON.parse(JSON.stringify(results))

                    resolve(res)
                })
            })
        }
    },
    Mutation: {
        createNote: (parent, { input }, context, info) => {
            const { category, alert, entity, entityId, focus, focusId, content, createdUserId } = input;

            return new Promise((resolve, reject) => {
                pool.query(
                    'insert into note (category, alert, entity, entityId, focus, focusId, content, createdDT, createdUserId) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        category,
                        alert,
                        entity,
                        entityId,
                        focus,
                        focusId,
                        content,
                        new Date(),
                        createdUserId
                    ],
                    (err, results) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        let res = JSON.parse(JSON.stringify(results))

                        resolve(res.insertId)
                    }
                )
            })
        },
        updateNote: (parent, arg, context, info) => {
            const { noteId, content } = arg;

            return new Promise((resolve, reject) => {
                pool.query(
                    'update note set content = ? where noteId = ?',
                    [
                        content,
                        noteId
                        
                    ],
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            return;
                        }

                        let res = JSON.parse(JSON.stringify(results))

                        resolve(res.changedRows)
                    }
                )
            })
        },
        deleteNote: (parent, arg, context, info) => {
            const { noteId } = arg;

            return new Promise((resolve, reject) => {
                pool.query(
                    'delete from note where noteId = ?',
                    noteId,
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            return;
                        }

                        let res = JSON.parse(JSON.stringify(results))

                        resolve(res.affectedRows)
                    }
                )
            })
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    // trace to check the performance --- Apollo Studio
    tracing: true
});

// The `listen` method launches a web server.
server.listen(8000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});