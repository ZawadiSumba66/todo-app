class Todo {
  constructor(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
  }
}

const todoModule = (() => {
  const createTodo = (title, description, date) => {
    const newTodo = new Todo(title, description, date);
    return newTodo;
  };

  const deleteTodo = (list, index) => list.splice(index, 1);

  return { createTodo, deleteTodo };
})();

export default todoModule;
export { todoModule, Todo };