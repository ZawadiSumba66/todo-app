import project from './project';
import todo from './task';
import storageModule from './storage';

const show = (object) => {
  object.classList.toggle('hidden');
};

const createLabel = (name) => {
  const label = document.createElement('label');
  label.setAttribute('for', `${name}`);
  let capitalized = name.charAt(0).toUpperCase();
  capitalized = capitalized.concat(name.slice(1));
  label.textContent = capitalized;

  return label;
};

const createInput = (name, type) => {
  const input = document.createElement('input');
  input.setAttribute('id', `${name}`);
  input.type = type;
  return input;
};


const setActive = () => {
  const projects = project.getProjectsArray();
  for (let i = 0; i < projects.length; i += 1) {
    projects[i].active = false;
  }
};

const editButton = (list, i, parent) => {
  const div = document.createElement('div');
  div.classList.add('expanded');
  const editBtn = document.createElement('button');
    editBtn.addEventListener('click', edit.bind(this, list, i, parent)); // eslint-disable-line
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit');
  div.appendChild(editBtn);
  parent.appendChild(div);
};

const addTask = (list, index) => {
  const newDiv = document.createElement('div');
  const wrapper = document.createElement('div');
  wrapper.classList.add('todo-items');
  const todoTitle = document.createElement('p');
  const todoDescription = document.createElement('p');
  const todoDate = document.createElement('p');
  const todoPriority = document.createElement('p');
  const deleteTodoBtn = document.createElement('button');
  deleteTodoBtn.classList.add('delete');
  deleteTodoBtn.textContent = 'Delete';
  deleteTodoBtn.addEventListener('click', () => {
    todo.deleteTodo(list, index);
    newDiv.parentNode.removeChild(newDiv);
    storageModule.saveLocal();
  });
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.textContent = 'click here to view more';
  todoTitle.textContent = list[index].title;
  editBtn.addEventListener('click', editButton.bind(this, list, index, newDiv));
  todoDescription.textContent = list[index].description;
  todoDate.textContent = list[index].date;
  todoPriority.textContent = list[index].priority;
  wrapper.appendChild(todoTitle);
  wrapper.appendChild(todoDescription);
  wrapper.appendChild(todoDate);
  wrapper.appendChild(todoPriority);
  wrapper.appendChild(editBtn);
  wrapper.appendChild(deleteTodoBtn);
  newDiv.appendChild(wrapper);
  return newDiv;
};

const loadAllTodos = (index, div) => {
  const todoDiv = div;
  const projectArr = project.getProjectsArray();
  todoDiv.innerHTML = '';

  if (projectArr.length === 0) { return; }
  const btn = document.createElement('button');
  btn.classList.add('add');
  btn.setAttribute('id', index);
  const projectTitle = document.createElement('h3');
  projectTitle.textContent = projectArr[index].name;
  btn.textContent = 'Add Task';
  btn.addEventListener('click', () => {
    const todo = document.querySelector('.forms .todo-form');
    todo.setAttribute('id', index);
    const title = todo.querySelector('h3');
    title.textContent = 'New Todo';
    show(todo);
  });
  todoDiv.appendChild(projectTitle);
  todoDiv.appendChild(btn);
  const { list } = projectArr[index];
  for (let i = 0; i < list.length; i += 1) {
    const newDiv = addTask(list, i);
    todoDiv.appendChild(newDiv);
  }
};

const addProjects = (projects, active = 0, pDiv, tDiv) => {
  const projectDiv = pDiv;
  const todoDiv = tDiv;
  projectDiv.innerHTML = '';
  for (let i = 0; i < projects.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('d-flex');
    projects[i].active = false;
    if (i === active) {
      projects[i].active = true;
    }
    const projectSpan = document.createElement('p');
    projectSpan.classList.add('project');
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.classList.add('delete-project');
    deleteProjectBtn.textContent = 'X';
    deleteProjectBtn.addEventListener('click', () => {
      if (projects[i].active) {
        // if (projects[i]) {
        project.deleteProject(i);
        projectDiv.removeChild(newDiv);
        loadAllTodos(0, todoDiv);
      } else {
        project.deleteProject(i);
        addProjects(projects, project.getActive(), projectDiv, todoDiv);
      }
      storageModule.saveLocal();
    });
    projectSpan.classList.add('pointer');
    projectSpan.textContent = projects[i].name;
    projectSpan.addEventListener('click', () => {
      const todo = document.querySelector('.todo-form');
      todo.classList.add('hidden');
      loadAllTodos(i, todoDiv);
      setActive();
      projects[i].active = true;
    });
    newDiv.classList.add('d-flex');
    newDiv.appendChild(projectSpan);
    newDiv.appendChild(deleteProjectBtn);
    projectDiv.appendChild(newDiv);
  }
};

const todoForm = (tDiv) => {
  const todoDiv = tDiv;
  const form = document.createElement('form');
  form.classList.add('hidden', 'todo-form');
  const formStructure = document.createElement('div');
  formStructure.classList.add('d-flex', 'flex-column');
  const formTitle = document.createElement('h3');
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const titleLabel = createLabel('title');
  const title = createInput('title', 'text');
  title.value = '';
  const descriptionLabel = createLabel('description');
  const description = document.createElement('textarea');
  description.setAttribute('id', 'description');
  description.value = '';
  const dueLabel = createLabel('due');
  const due = createInput('due', 'date');
  due.value = '';
  const priorityLabel = createLabel('Priority');
  const array = ['High', 'Low', 'Medium'];
  const priority = document.createElement('select');
  priority.setAttribute('id', 'priority');
  for (let i = 0; i < array.length; i += 1) {
    const option = document.createElement('option');
    option.value = array[i];
    option.text = array[i];
    priority.appendChild(option);
  }
  priority.value = '';

  const btn = createInput('Submit', 'submit');
  btn.value = 'Submit';
  btn.classList.add('submit');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.querySelector('#title');
    const desc = form.querySelector('#description');
    const due = form.querySelector('#due');
    const priority = form.querySelector('#priority');
    const newtodo = todo.createTodo(title.value, desc.value, due.value, priority.value);
    const arr = project.getProjectsArray();
    const index = form.id;
    arr[index].addTodo(newtodo);
    loadAllTodos(index, todoDiv);
    form.reset();
    storageModule.saveLocal();
  });
  formStructure.appendChild(formTitle);
  formStructure.appendChild(titleLabel);
  formStructure.appendChild(title);
  formStructure.appendChild(descriptionLabel);
  formStructure.appendChild(description);
  formStructure.appendChild(dueLabel);
  formStructure.appendChild(due);
  formStructure.appendChild(priorityLabel);
  formStructure.appendChild(priority);
  formStructure.appendChild(btn);
  form.appendChild(formStructure);

  return form;
};

const todoFields = (t = '', desc = '', dueDate = '', pr = '') => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex', 'flex-column');
  const formTitle = document.createElement('h3');
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const titleLabel = createLabel('title');
  const title = createInput('title', 'text');
  title.value = t;
  const descriptionLabel = createLabel('description');
  const description = document.createElement('textarea');
  description.setAttribute('id', 'description');
  description.value = desc;
  const dueLabel = createLabel('due');
  const due = createInput('due', 'date');
  due.value = dueDate;
  const priority = document.createElement('select');
  priority.setAttribute('id', 'priority');
  const array = ['High', 'Low', 'Medium'];
  for (let i = 0; i < array.length; i += 1) {
    const option = document.createElement('option');
    option.value = array[i];
    option.text = array[i];
    priority.appendChild(option);
  }
  priority.value = pr;
  const priorityLabel = createLabel('priority');
  wrapper.appendChild(formTitle);
  wrapper.appendChild(titleLabel);
  wrapper.appendChild(title);
  wrapper.appendChild(descriptionLabel);
  wrapper.appendChild(description);
  wrapper.appendChild(dueLabel);
  wrapper.appendChild(due);
  wrapper.appendChild(priorityLabel);
  wrapper.appendChild(priority);

  return wrapper;
};

const editForm = (list, i, element) => {
  const form = document.createElement('form');
  form.classList.add('todo-form');
  const formStructure = todoFields(
    list[i].title,
    list[i].description,
    list[i].date,
    list[i].priority,
  );
  const btn = createInput('Submit', 'submit');
  btn.value = 'Edit';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.querySelector('#title');
    const desc = form.querySelector('#description');
    const due = form.querySelector('#due');
    const priority = form.querySelector('#priority');
    list[i].edit(title.value, desc.value, due.value, priority.value);
    const edited = addTask(list, i);
    element.parentNode.insertBefore(edited, element);
    element.parentNode.removeChild(element);
    storageModule.saveLocal();
  });

  formStructure.appendChild(btn);
  form.appendChild(formStructure);

  return form;
};

const edit = (list, i, parent) => {
  const expanded = parent.querySelector('.expanded');
  expanded.innerHTML = '';
  const form = editForm(list, i, parent);
  expanded.appendChild(form);
};


const projectForm = (pDiv, tDiv, todoF) => {
  const projectDiv = pDiv;
  const todoDiv = tDiv;
  const form = document.createElement('form');
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex', 'flex-column');
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'New Project';
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const nameLabel = createLabel('name');
  const name = createInput('name', 'text');
  name.classList.add('name');

  const submit = document.createElement('button');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    project.createProject(name.value);
    const arr = project.getProjectsArray();
    addProjects(arr, arr.length - 1, projectDiv, todoDiv);
    loadAllTodos(arr.length - 1, todoDiv);
    form.reset();
    const todoForm = todoF;
    todoForm.classList.add('hidden');
    storageModule.saveLocal();
  });
  submit.textContent = 'Submit';
  submit.classList.add('submit');
  wrapper.appendChild(formTitle);
  wrapper.appendChild(nameLabel);
  wrapper.appendChild(name);
  wrapper.appendChild(submit);
  form.appendChild(wrapper);

  return form;
};

const allPage = (projects) => {
  const content = document.querySelector('.content');
  content.classList.add('d-flex', 'content');
  const projectDiv = document.createElement('div');
  const todoDiv = document.createElement('div');
  const formDiv = document.createElement('div');
  formDiv.classList.add('forms', 'absolute');
  projectDiv.setAttribute('id', 'projects', 'd-flex');
  projectDiv.classList.add('projects');
  todoDiv.setAttribute('id', 'todo');
  todoDiv.classList.add('todo');
  const todo = todoForm(todoDiv);
  const form = projectForm(projectDiv, todoDiv, todo);
  formDiv.appendChild(form);
  formDiv.appendChild(todo);
  content.appendChild(formDiv);
  content.appendChild(projectDiv);
  content.appendChild(todoDiv);
  loadAllTodos(0, todoDiv);
  addProjects(projects, 0, projectDiv, todoDiv);
};

export default allPage;
export {
  show,
  createLabel,
  createInput,
  setActive,
  addTask,
  loadAllTodos,
  addProjects,
  todoForm,
  edit,
  editForm,
  projectForm,
  allPage,
  todoFields,
  editButton,
};