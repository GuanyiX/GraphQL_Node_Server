'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar DateTime

  type Query {
    getClients: [Client]
    getNotes(entityId: Int!): [Note]
    loginUser(userLogin: String, password: String): tokenres
  }

  type Mutation {
    createNote(input: NoteType!): Int
    updateNote(noteId: Int!, content: String!): Int
    deleteNote(noteId: Int!): Int
    createUser(input: UserType!): Boolean
  }

  type tokenres {
    id: Int
    token: String
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

  input UserType {
    userLogin: String!
    prefName: String!
    password: String!
    roleId: Int!
  }
`;


module.exports = typeDefs;