'use strict';

var mysql = require('mysql');


var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(err) {
  if(err) {
    console.log('ERR', err);
  }
  else {
    console.log('Connected to the database.  So lucky!');
  }
});

module.exports = connection;
