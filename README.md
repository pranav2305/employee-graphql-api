# Task ID: CRUD API

<br>

## Setup

1. Open a terminal

2. Navigate to the directory where you want to install the project <br>
`Example : cd wec-recs`

3. Clone the repository <br>
`git clone https://github.com/pranav2305/employee-graphql-api.git`

4. Navigate to the project directory<br>
`cd employee-graphql-api`

5. Install the node packages <br>
`npm i`

6. Start a local mongo server by opening **mongod**(Install mongoDB from this [link](https://docs.mongodb.com/manual/administration/install-community/) if u don't have it already)

7. Run the server and go to [this](http://localhost:3000/graphql) link <br>
`node server.js`

<br>

## How to use

1. Open the [website](http://localhost:3000/graphql).

2. Type any query or mutation in the GraphiQL interface. You can refer the [list](#crud-operations) given below for all operations.

3. The results for that query/mutation will be displayed.

<br>

## Tech Used

-  An express server was made using **[Node.js](https://nodejs.org/dist/latest-v16.x/docs/api/)**.
- **[Mongoose](https://mongoosejs.com/docs/api.html)** package was used to store data on a local MongoDB database
- **[GraphQL](https://graphql.org/learn/)** was used for the communication between the frontend and the backend.

<br>

## About

A simple CRUD API to store details about employees, their depatments and the projects they are working on. This app allows the user to create, read, update and delete employees, departments and organizations. GraphQL was used to communicate between the frontend and the backend because GraphQL has many advantages compared to normal API calling. GraphQL allows us to make all CRUD operations using the same route, so we require only 1 route. GraphQL also allows us to request. It also allows us to collect heirarchichal data more easily and we can request specific fields as per our requirements instead of fetching the entire details.

<br>

## CRUD operations

### Queries

1. Projects
```
{
  projects{
    id
    title
    from_date
    to_date
  }
}
```
```
{
  project(id: ""){
    id
    title
    from_date
    to_date
  }
}
```
2. Departments
```
{
  departments{
    id
    name
    location
  }
}
```
```
{
  department(id: ""){
    id
    name
    location
  }
}
```

3. Employees
```
{
  employees{
    id
    name
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```

```{
  employee(id: ""){
    id
    name
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```

### Mutations

1. Projects
```
mutation{
  addProject(title: "", from_date: "", to_date: ""){
    id
    title
    from_date
    to_date
  }
}
```
```
mutation{
  updateProject(id: "", title: ""){
    id
    title
    from_date
    to_date
  }
}
```
```
mutation {
  deleteProject(id: "") {
    id
    title
    from_date
    to_date
  }
}
```

2. Departments
```
mutation {
	addDepartment(name: "", location: ""){
    id
    name
    location
  }
}
```
```
mutation {
  updateDepartment(id: "", location: ""){
    id
    name
    location
  }
}
```
```
mutation {
  deleteDepartment(id: ""){
    id
    name
    location
  }
}
```

3. Employees
```
mutation {
  addEmployee(name: "", age: , salary: , department: "", from_date: "2", to_date: "", projects: []){
    id
    name
    age
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```

```
mutation {
  addEmployeeProject(id:"", project_id: ""){
    id
    name
    age
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```
```
mutation {
  updateEmployee(id: "", to_date: "")
  {
    id
    name
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```
```
mutation {
  deleteEmployee(id: ""){
    id
    name
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```
```
mutation {
  deleteEmployeeProject(id: "", project_id: ""){
    id
    name
    salary
    from_date
    to_date
    department{
      id
      name
      location
    }
    projects{
      id
      title
      from_date
      to_date
    }
  }
}
```

<br>

## Demo video

Link: 

<br>

## References

1. [GraphQl docs](https://graphql.org/learn/)

2. [GraphQL sample](https://www.ibrahima-ndaw.com/blog/graphql-api-express-mongodb/)

3. [GraphQL tutorial](https://youtu.be/PpCF8yRtd_A)

2. [Mongoose docs](https://mongoosejs.com/docs/api.html)