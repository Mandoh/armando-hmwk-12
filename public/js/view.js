$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteBurgers);
  $(document).on("click", "button.complete", toggleEaten);
  // $(document).on("click", ".todo-item", editTodo);
  // $(document).on("keyup", ".todo-item", finishEdit);
  // $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#burger-form", insertBurgers);

  // Our initial todos array
  var burgers = [];

  // Getting todos from database when page loads
  getBurgers();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    $burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteBurgers(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getBurgers);
  }

  // This function handles showing the input box for a user to edit a todo
  function editTodo() {
    var currentTodo = $(this).data("todo");
    $(this).children().hide();
    $(this).children("input.edit").val(currentTodo.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleEaten(event) {
    event.stopPropagation();
    var burger = $(this).parent().data("burger");
    burger.eaten = !burger.eaten;
    updateBurger(burger);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  // function finishEdit(event) {
  //   var updatedTodo = $(this).data("todo");
  //   if (event.which === 13) {
  //     updatedTodo.text = $(this).children("input").val().trim();
  //     $(this).blur();
  //     updateTodo(updatedTodo);
  //   }
  // }

  // This function updates a todo in our database
  function updateBurger(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    }).then(getBurgers);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentTodo = $(this).data("todo");
    if (currentTodo) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.name,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("burger", burger);
    if (burger.eaten) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertBurgers(event) {
    console.log($newItemInput.val().trim());
    event.preventDefault();
    var burger = {
      name: $newItemInput.val().trim(),
      eaten: false
    };
console.log(burger);
    $.post("/api/burgers", burger, getBurgers);
    $newItemInput.val("");
  }
});
