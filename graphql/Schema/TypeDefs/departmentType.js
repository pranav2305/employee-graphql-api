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
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({ 
                    '_id': { $in: parent.projects} 
                });
            }
        }
    })
});

const ProjectType = require("./projectType")