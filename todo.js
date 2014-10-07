var todosArray = JSON.parse(localStorage.getItem('todo')) || [];

function addButtons(event, value, skip){
  // first, get the unordered list of todos
  var todos = document.getElementById("todos");

  // then, let's make an li element and append it to the ul with the text of
  // what we submitted in our form
  var todo = document.createElement("li");

  todos.appendChild(todo);

  // let's create two buttons, one with the the text Delete and the other with Done
  var deleteButton = document.createElement("button");
  var updateButton = document.createElement("button");
  var todoText = document.createElement("span");
  todoText.innerText = value || this.todo.value;
  deleteButton.innerText = "Delete";
  updateButton.innerText = "Done";

  // let's add these buttons to the page
  todo.appendChild(todoText);
  todo.appendChild(deleteButton);
  todo.appendChild(updateButton);

  // add EventListeners
  deleteButton.addEventListener("click", deleteTodo);
  updateButton.addEventListener("click", updateTodo);

  // clear form value
  this.todo.value = "";

  // check to see if it is a new task - if so, add it to the array
  if (!skip){
    var todoTask = {
      todo: todoText.innerText,
      highlight: false
    };
    todosArray.push(todoTask);
    localStorage.setItem('todo', JSON.stringify(todosArray));
  }
}

function getTodos(){
  var listOfTodos = document.querySelectorAll("ul");
  var listOfListItems = listOfTodos[0].children;
  for (var i = 0; i < todosArray.length; i++) {
    addButtons(event,todosArray[i].todo, true);
    if(todosArray[i].highlight === true){
        listOfTodos[0].children[i].children[2].innerText = "Undo";
        listOfTodos[0].children[i].classList.add("complete");
      }
    else {
      listOfTodos[0].children[i].classList.add("incomplete");
    }
  }
}

// event handler buttons
function updateTodo(){
  var text = this.parentElement.children[0].innerText;
  var i;
  // If the button has the text of done, give it the class of complete and switch its text
  if(this.innerText === "Done") {
    this.innerText = "Undo";
    this.parentElement.setAttribute("class","complete");
     for (i = 0; i < todosArray.length; i++) {
      if (text == todosArray[i].todo){
      todosArray[i].highlight = true;
    }
  }
  }
  else{
    this.innerText = "Done";
    this.parentElement.removeAttribute("class","complete");
    this.parentElement.setAttribute("class","incomplete");

    for (i = 0; i < todosArray.length; i++) {
      if (text == todosArray[i].todo){
        todosArray[i].highlight = false;
    }
  }
  }
  localStorage.setItem('todo', JSON.stringify(todosArray));
}

function deleteTodo(){
  var conf = confirm("Are you sure?");
  if (conf){
  for (var i = 0; i < todosArray.length; i++) {
    var text = this.parentElement.children[0].innerText;
    if (text == todosArray[i].todo){
      this.parentElement.remove();
      todosArray.splice(i,1);
    }
  }
  localStorage.setItem('todo', JSON.stringify(todosArray));
}
}

function initialize(){
  var todoForm = document.getElementById("todoForm");
  todoForm.addEventListener("submit",addButtons);
  getTodos();
}

window.onload=initialize;
