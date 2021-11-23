const graphql = require('graphql');

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID 
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString}
    })
})