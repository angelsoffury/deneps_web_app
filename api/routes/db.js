var mysql = require('mysql8.0');
const dotenv = require('dotenv');
dotenv.config();
const DB_password=process.env.DB_password;

var db = mysql.createPoolCluster();

// add configuration of the db cluster
db.add('node1',{
      host: "msdb-dpsdev-npd1-1.cisco.com",
      user: "dpsdevdb_admin",
      password: DB_password,
      database: "dpsdevdb",
      port: "6754",
      ssl: true
})
db.add('node2',{
  host: "msdb-dpsdev-npd2-1.cisco.com",
  user: "dpsdevdb_admin",
  password: DB_password,
  database: "dpsdevdb",
  port: "6754",
  ssl: true
})
db.add('node3',{
  host: "msdb-dpsdev-npd3-1.cisco.com",
  user: "dpsdevdb_admin",
  password: DB_password,
  database: "dpsdevdb",
  port: "6754",
  ssl: true
})



//Connect to the db cluster https://github.com/mysqljs/mysql#poolcluster

module.exports=db;

