'use strict';

const GraphQLDateTime = require('graphql-type-datetime');

const clientResolvers = require('./client');
const noteResolvers = require('./note');
const userResolvers = require('./register');
const loginResolvers = require('./login');

module.exports = {
    DateTime: GraphQLDateTime,
    Query: {
        ...clientResolvers.Query,
        ...noteResolvers.Query,
        ...loginResolvers.Query
    },
    Mutation: {
        ...noteResolvers.Mutation,
        ...userResolvers.Mutation
    }
}