const graphql = require('graphql');
const Department = require("../../../db/models/department")
const Project = require('../../../db/models/project')

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, 
    GraphQLList 
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString },
        age: {type: GraphQLInt}, 
        department: { 
            type: DepartmentType,
            resolve(parent, args) {
                return Department.findById(parent.department)
            }
        },
        salary: {type: GraphQLInt},
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString},
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

const DepartmentType = require("./departmentType")
const ProjectType = require("./projectType")