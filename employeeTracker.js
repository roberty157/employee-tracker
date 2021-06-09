
//foreign key matches the primary key field of another table
const inquirer = require('inquirer');
const mysql = require('mysql');
// Enable access to .env variables
require('dotenv').config();

// Use environment variables to connect to database

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: process.env.DB_password,
    database: process.env.DB_name,
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    
  });

  //add departments, roles, employees

  //add, view, update
  
function addDepartment(){
    inquirer
    .prompt([
        {
            type:'input',
            message:"What is the name of the new department?",
            name:'name'
        },
    ])
    .then((response)=>{
        const query = connection.query(
            'INSERT INTO department SET ?',
            {
              name: `${response.name}`
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} product inserted!\n`);
            }
          );
          console.log(query.sql);
    })
}
function addRole(){
    inquirer
    .prompt([
        {
            type:'input',
            message:"What is the title of the new role?",
            name:'title'
        },
        {
            type:'input',
            message:"What is the salary of the new role?",
            name:'salary'
        },
        {
            type:'input',
            message:"What is the department_id of the new role?",
            name:'department_id'
        },
    ])
    .then((response)=>{
        const query = connection.query(
            'INSERT INTO role SET ?',
            {
              title: response.title,
              salary: response.salary,
              department_id: response.department_id
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} product inserted!\n`);
            }
          );
          console.log(query.sql);
    })
}
function addEmployee(){
    inquirer
    .prompt([
        {
            type:'input',
            message:"What is the first_name of the new employee?",
            name:'first_name'
        },
        {
            type:'input',
            message:"What is the last_name of the new employee?",
            name:'last_name'
        },
        {
            type:'input',
            message:"What is the role_id of the new employee?",
            name:'role_id'
        },
    ])
    .then((response)=>{
        const query = connection.query(
            'INSERT INTO employee SET ?',
            {
              first_name: response.first_name,
              last_name: response.last_name,
              role_id: response.role_id,
              manager_id: response.manager_id
                
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} product inserted!\n`);
            }
          );
          console.log(query.sql);
    })
}
function viewTable(table){
    connection.query(`SELECT * FROM ${table}`, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        console.log('\n');
    });
    init();
}
function add(){
    inquirer
    .prompt([
        {
            type:'list',
            message:"What would you like to add?",
            choices: ['department','role','employee'],
            name:'table'
        },
    ])
    .then((response)=>{
        if(response.table === 'department'){
            addDepartment();
        }else if(response.table === 'role'){
            addRole();
        }
       else{
            addEmployee();
       }
    })
}
function view(){
    inquirer
    .prompt([
        {
            type:'list',
            message:"What would you like to view?",
            choices: ['department','role','employee'],
            name:'table'
        },
        
    ])
    .then((response)=>{
       viewTable(response.table);
        
    })
}

function update(){
    console.log(update);
    
}

function init(){
    inquirer
    .prompt([
        {
            type:'list',
            message:"What would you like to do?",
            choices: ['add','view','update employee roles','quit'],
            name:'action'
        },
        
    ])
    .then((response)=>{
       if(response.action === 'add'){
        add();
       }else if(response.action === 'view'){
        view();
       }else if(response.action === 'update employee roles'){
        update();
       }else{
        connection.end();
       }
        
    })
}

//init();

connection.query(`SELECT id FROM department`, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    const map1 = res.map(x => x.id);
    console.log(map1);
    console.log('\n');
});