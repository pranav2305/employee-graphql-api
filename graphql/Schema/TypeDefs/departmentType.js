const graphql = require('graphql');
const Project = require('../../../db/models/project')

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, 
    GraphQLList 
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Department',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: {type: GraphQLString}
        })
});