// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("./connection.js");

// ORM
// =============================================================

var table = "burgers";

var orm = {

  getBurgers: function(callback) {
    var query = "SELECT * FROM " + table;

    connection.query(query, function(err, result) {

      callback(result);

    });
  },

  // Here our ORM is creating a simple method for performing a query of a single character in the table.
  // Again, we make use of the callback to grab a specific character from the database.

  deleteBurgers: function(id, callback) {

    var query = "DELETE FROM " + table + " WHERE id=?";

    connection.query(query, [id], function(err, result) {

      callback(result);
    });

  },

  addBurgers: function(burger, callback) {
    var query = "INSERT INTO " + table + " (name, eaten) VALUES (?,?)";
    burger.eaten = false;
    connection.query(query, [
      burger.name, burger.eaten
    ], function(err, result) {

      callback(result);

    });
  },

  // editTodo: function(burger, callback) {
  //   var s = "UPDATE " + table + " SET text=? WHERE id=?";

  //   connection.query(s, [
  //     todo.text, todo.id
  //   ], function(err, result) {

  //     callback(result);

  //   }); 
  // }
 
};

module.exports = orm;
