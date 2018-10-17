// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
var orm = require("../config/orm.js");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/burgers", function(req, res) {
    orm.getBurgers(function(results) {
      res.json(results);
    });
  });

  // POST route for savifng a new todo. We can create a todo using the data on req.body
  app.post("/api/burgers", function(req, res) {

    orm.addBurgers(req.body, function(results) {
      res.json(results);
    });
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    orm.deleteBurgers(req.params.id, function(results) {
      res.json(results);
    });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  // app.put("/api/todos", function(req, res) {
  //   orm.editTodo(req.body, function(results) {
  //     res.json(results);
  //   });
  // });
};
