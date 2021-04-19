class Todo {
  constructor(title, description, date,priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
  }
}

Todo.prototype.edit = function (title, description, date, priority) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.priority = priority;
};

const todoModule = (() => {
  const createTodo = (title, description, date, priority) => {
    const newTodo = new Todo(title, description, date, priority);
    return newTodo;
  };

  const deleteTodo = (list, index) => list.splice(index, 1);

  return { createTodo, deleteTodo };
})();

export default todoModule;
export { todoModule, Todo };