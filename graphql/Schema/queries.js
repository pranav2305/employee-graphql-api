const graphql = require('graphql');
const Employee = require('../../db/models/employee');
const Department = require('../../db/models/department');
const Project = require('../../db/models/project')
const EmployeeType = require("./TypeDefs/employeeType")
const DepartmentType = require("./TypeDefs/departmentType")
const ProjectType = require("./TypeDefs/projectType")

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLList 
} = graphql;

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular 
//book or get a particular author.

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Employee.findById(args.id);
            }
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                return Employee.find({});
            }
        },
        department:{
            type: DepartmentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Department.findById(args.id);
            }
        },
        departments:{
            type: new GraphQLList(DepartmentType),
            resolve(parent, args) {
                return Department.find({});
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        }
    }
});

module.exports = RootQuery;