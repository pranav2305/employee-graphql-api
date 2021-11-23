const RootQuery = require("./Schema/queries")
const Mutation = require("./Schema/mutations")
const {GraphQLSchema} = require("graphql")

const db = require("../db")

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});