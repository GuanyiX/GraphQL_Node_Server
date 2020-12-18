'use strict';

const GraphQLDateTime = require('graphql-type-datetime');

const clientResolvers = require('./client');
const noteResolvers = require('./note');

module.exports = {
    DateTime: GraphQLDateTime,
    Query: {
        ...clientResolvers.Query,
        ...noteResolvers.Query
    },
    Mutation: {
        ...noteResolvers.Mutation
    }
}