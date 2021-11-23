const graphql = require('graphql');
const Employee = require('../../db/models/employee');
const Department = require('../../db/models/department');
const Project = require('../../db/models/project');
const ProjectType = require('./TypeDefs/projectType');
const EmployeeType = require("./TypeDefs/employeeType")
const DepartmentType = require("./TypeDefs/departmentType")
const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                department: {type: new GraphQLNonNull(GraphQLID)},
                salary: {type: GraphQLInt},
                projects: {type: new GraphQLList(GraphQLID)}
            },
            async resolve(parent, args) {
                let employee = new Employee({
                    name: args.name,
                    age: args.age,
                    departmentID: args.department,
                    salary: args.salary,
                    projectIDs: args.projects
                });
                await employee.save();
            }
        },

        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
                department: {type: new GraphQLNonNull(GraphQLID)},
                salary: {type: GraphQLInt},
                projects: {type: new GraphQLList(GraphQLID)}
            },
            async resolve(parent, args) {
                await Employee.findByIdAndUpdate(args.id, { name: args.name, age: args.age, departmentID: args.department, salary: args.salary, projectIDs: args.projects }, function (err) {
                    if (err) console.log(err);
                  });
            }
        },

        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                const remEmployee = Employee.findByIdAndRemove(args.id).exec();
                if (!remBook) {
                  throw new Error('Error')
                }
                await remBook;
            }

        },

        addDepartment: {
            type: DepartmentType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                projects: {type: new GraphQLList(GraphQLString)}
            },
            async resolve(parent, args) {
                let dept = new Department({
                name: args.name,
                projectIDs: args.projects,
                });
                await dept.save();
            }

        },

        updateDepartment: {
            type: DepartmentType,
            args: {
                id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
                name: {type: new GraphQLNonNull(GraphQLString)},
                projects: {type: new GraphQLList(GraphQLString)}
            },
            async resolve(parent, args) {
                await Department.findByIdAndUpdate(args.id, { name: args.name, projectIDs: args.projects }, function (err) {
                    if (err) console.log(err);
                });
            }
        },

        deleteDepartment: {
            type: DepartmentType,
            args: {
                id: {type: GraphQLString}
            },
            async resolve(parent, args) {
                const remDept = Department.findByIdAndRemove(args.id).exec();
                if (!remBook) {
                  throw new Error('Error')
                }
                await remBook;
            }
        },

        addProject: {
            type: ProjectType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                from_date: {type: new GraphQLNonNull(GraphQLString)},
                to_date: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                let project = new Project({
                    title: args.title,
                    from_date: args.from_date,
                    to_date: args.to_date
                });
                return project.save();
            }
        },

        updateProject: {
            type: ProjectType,
            args: {
                id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
                title: {type: new GraphQLNonNull(GraphQLString)},
                from_date: {type: new GraphQLNonNull(GraphQLString)},
                to_date: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                await Project.findByIdAndUpdate(args.id, { $set: { title: args.title, fromDate: args.from_date, toDate: args.to_date}})
            }
        },

        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLID}
            },
            async resolve(parent, args) {
                const remProject = Project.findByIdAndRemove(args.id);
                console.log(remProject)
                if (!remProject) {
                  throw new Error('Error')
                }
                await remProject;
            }
        }
    }
});

module.exports = Mutation;