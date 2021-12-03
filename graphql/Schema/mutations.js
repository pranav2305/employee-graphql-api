const graphql = require('graphql');
const Employee = require('../../db/models/employee');
const Department = require('../../db/models/department');
const Project = require('../../db/models/project');
const ProjectType = require('./TypeDefs/projectType');
const EmployeeType = require("./TypeDefs/employeeType")
const DepartmentType = require("./TypeDefs/departmentType");
const employee = require('../../db/models/employee');
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
                age: { type: GraphQLInt },
                department: {type: GraphQLID},
                salary: {type: GraphQLInt},
                from_date: {type: GraphQLString},
                to_date: {type: GraphQLString},
                projects: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args) {
                let employee = new Employee({
                    name: args.name,
                    age: args.age,
                    department: args.department,
                    salary: args.salary,
                    from_date: args.from_date,
                    to_date: args.to_date,
                    projects: args.projects
                });
                return employee.save();
            }
        },

        addEmployeeProject:{
            type: EmployeeType,
            args: {
                id: {name: "id", type: new GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                from_date: {type: GraphQLString},
                to_date: {type: GraphQLString},
                project_id: {type: GraphQLString}
        },
            resolve(parent, args) {
                Employee.findById(args.id, (error, emp) => {
                    if (error){
                        throw error;
                    }
                    if (!emp) {
                        throw new Error('Employee ' + args.id +' not found');
                    }
                    if (args.project_id){
                        emp.projects.push(args.project_id);
                    } else {
                        let project = new Project({
                            title: args.title,
                            from_date: args.from_date,
                            to_date: args.to_date
                        });
                        new_project = project.save();
                        emp.projects.push(String(new_project._id));
                    }
                    emp.save();
                })
                return Employee.findById(args.id);
            }
        },

        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                department: {type: GraphQLID},
                salary: {type: GraphQLInt},
                from_date: { type: GraphQLString },
                to_date: { type: GraphQLString },
                projects: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args) {
                Employee.findByIdAndUpdate(args.id, { name: args.name, age: args.age, department: args.department, salary: args.salary, from_date: args.from_date, to_date: args.to_date, projects: args.projects }, (err) => {
                    if (err){
                        throw err;
                    }
                });
                return Employee.findById(args.id);
            }
        },

        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const remEmployee = Employee.findByIdAndRemove(args.id).exec();
                if (!remEmployee) {
                  throw new Error('Employee ' + args.id +' not found')
                }
                return remEmployee;
            }

        },

        deleteEmployeeProject: {
            type: EmployeeType,
            args: {
                id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
                project_id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                Employee.findById(args.id, (error, emp) => {
                    if (error){
                        throw error;
                    }
                    if (!emp) {
                        throw new Error('Employee ' + args.id +' not found')
                    }
                    emp.projects.forEach(function(project){
                        if (project == args.project_id){
                            emp.projects.pop(project)
                        }
                    })
                    emp.save()
                })
                return Employee.findById(args.id);
            }
        },

        addDepartment: {
            type: DepartmentType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                location: {type: GraphQLString}
            },
            resolve(parent, args) {
                let dept = new Department({
                name: args.name,
                location: args.location,
                });
                return dept.save();
            }

        },

        updateDepartment: {
            type: DepartmentType,
            args: {
                id: { name: "id", type: new GraphQLNonNull(GraphQLString) },
                name: {type: GraphQLString},
                location: {type: GraphQLString}
            },
            resolve(parent, args) {
                Department.findByIdAndUpdate(args.id, { name: args.name, location: args.location }, (err)=>{
                    if (err){
                        throw err;
                    }
                });
                return Department.findById(args.id);
            }
        },

        deleteDepartment: {
            type: DepartmentType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                Employee.find({}, (error, employees) => {
                    if (error){
                        throw error;
                    }
                    employees.map(employee => {
                        if (String(employee.department) == args.id){
                            employee.department = null;
                        }
                        employee.save(function(err){
                            if (err){
                                return err
                            }
                        })
                    })
                })
                const remDept = Department.findByIdAndRemove(args.id).exec();
                if (!remDept) {
                  throw new Error('Department ' + args.id +' not found')
                }
                return remDept;
            }
        },

        addProject: {
            type: ProjectType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                from_date: {type: new GraphQLNonNull(GraphQLString)},
                to_date: {type: GraphQLString}
            },
            resolve(parent, args) {
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
                title: {type: GraphQLString},
                from_date: {type: GraphQLString},
                to_date: {type: GraphQLString}
            },
            resolve(parent, args) {
                Project.findByIdAndUpdate(args.id, { $set: { title: args.title, from_date: args.from_date, to_date: args.to_date}}, (err)=>{
                    if (err){
                        throw err;
                    }
                });
                return Project.findById(args.id);
            }
        },

        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                Employee.find({}, (error, employees) => {
                    if (error){
                        throw error;
                    }
                    employees.map(employee => {
                        employee.projects.forEach(function(project){
                            if (String(project) == args.id){
                                projects.pop(project)
                            }
                        })
                        employee.save(function(err){
                            if (err){
                                return err
                            }
                        })
                    })
                })
                const remProject = Project.findByIdAndRemove(args.id);
                console.log(remProject)
                if (!remProject) {
                  throw new Error('Error')
                }
                return remProject;
            }
        }
    }
});

module.exports = Mutation;