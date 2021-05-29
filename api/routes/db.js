var mysql = require('mysql8.0');

var db = mysql.createPoolCluster();

// add configuration of the db cluster
db.add('node1',{
      host: "msdb-dpsdev-npd1-1.cisco.com",
      user: "dpsdevdb_admin",
      password: "m5QY_j81B#",
      database: "dpsdevdb",
      port: "6754",
      ssl: true
})
db.add('node2',{
  host: "msdb-dpsdev-npd2-1.cisco.com",
  user: "dpsdevdb_admin",
  password: "m5QY_j81B#",
  database: "dpsdevdb",
  port: "6754",
  ssl: true
})
db.add('node3',{
  host: "msdb-dpsdev-npd3-1.cisco.com",
  user: "dpsdevdb_admin",
  password: "m5QY_j81B#",
  database: "dpsdevdb",
  port: "6754",
  ssl: true
})



//Connect to the db cluster https://github.com/mysqljs/mysql#poolcluster

module.exports=db;

