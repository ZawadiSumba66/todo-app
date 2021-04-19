import project from './project';
import todo from './task';
import storageModule from './storage';

const show = (object) => {
  object.classList.toggle('hidden');
};

const showButton = (object, content) => {
  const btn = document.createElement('button');
  btn.textContent = content;
  btn.addEventListener('click', show.bind(this, object));
  return btn;
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
  input.classList.add('m-bot-10');
  input.type = type;
  return input;
};

const setWhiteBg = () => {
  const div = document.querySelectorAll('#projects div');
  for (let i = 0; i < div.length; i += 1) {
    div[i].classList.remove('selected');
  }
};

const setActive = () => {
  const projects = project.getProjectsArray();
  for (let i = 0; i < projects.length; i += 1) {
    projects[i].active = false;
  }
};

const addTask = (list, index) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('m-bot-10');
  const wrapper = document.createElement('div');
  wrapper.classList.add('todo-items');
  const todoTitle = document.createElement('p');
  const todoDescription = document.createElement('p');
  const todoDate = document.createElement('p')
  const deleteTodoBtn = document.createElement('button');
  deleteTodoBtn.classList.add('delete');
  deleteTodoBtn.textContent = 'Delete';
  deleteTodoBtn.addEventListener('click', () => {
    todo.deleteTodo(list, index);
    newDiv.parentNode.removeChild(newDiv);
    storageModule.saveLocal();
  });
  todoTitle.textContent = list[index].title;
  todoDescription.textContent = list[index].description;
  todoDate.textContent = list[index].date;
  wrapper.appendChild(todoTitle);
  wrapper.appendChild(todoDescription);
  wrapper.appendChild(todoDate);
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
  projectTitle.textContent=projectArr[index].name
  btn.textContent = 'Add Task';
  btn.addEventListener('click', () => {
    const todo = document.querySelector('.forms .todo-form');
    todo.setAttribute('id', index);
    const title = todo.querySelector('h3');
    title.textContent = `New Todo`;
    show(todo);
  });
  todoDiv.appendChild(projectTitle)
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
      setWhiteBg();
      newDiv.classList.add('d-flex');
      projects[i].active = true;
    });
    newDiv.classList.add('d-flex')
    newDiv.appendChild(projectSpan);
    newDiv.appendChild(deleteProjectBtn);
    projectDiv.appendChild(newDiv);
  }
};

const todoForm = (tDiv) => {
  const todoDiv = tDiv;
  const form = document.createElement('form');
  form.classList.add('hidden', 'todo-form');
  const formStructure =  document.createElement('div');
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
  const btn = createInput('Submit', 'submit');
  btn.value = 'Submit';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.querySelector('#title');
    const desc = form.querySelector('#description');
    const due = form.querySelector('#due');
    const priority = form.querySelector('#priority');
    const newtodo = todo.createTodo(title.value, desc.value, due.value);
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
  formStructure.appendChild(btn);
  form.appendChild(formStructure);

  return form;
};


const projectForm = (pDiv, tDiv, todoF) => {
  const projectDiv = pDiv;
  const todoDiv = tDiv;
  const form = document.createElement('form');
  const wrapper = document.createElement('div');
  wrapper.classList.add('d-flex', 'flex-column');
  // form.classList.add('hidden');
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'New Project';
  formTitle.classList.add('m-bot-10', 'bold', 'title');
  const nameLabel = createLabel('name');
  const name = createInput('name', 'text');

  const submit = document.createElement('button');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    project.createProject(name.value);
    const arr = project.getProjectsArray();
    addProjects(arr, arr.length - 1, projectDiv, todoDiv);
    loadAllTodos(arr.length - 1, todoDiv);
    form.reset();
    // form.classList.add('hidden');
    const todoForm = todoF;
    todoForm.classList.add('hidden');
    storageModule.saveLocal();
  });
  submit.textContent = 'Submit';

  wrapper.appendChild(formTitle);
  wrapper.appendChild(nameLabel);
  wrapper.appendChild(name);
  wrapper.appendChild(submit);
  form.appendChild(wrapper);

  return form;
};

const pageLoad = (projects) => {
  const container = document.querySelector('#container');
  const content = document.querySelector('.content');
  content.classList.add('d-flex','content');
  const projectDiv = document.createElement('div');
  const todoDiv = document.createElement('div');
  const formDiv = document.createElement('div');
  formDiv.classList.add('forms', 'absolute');
  projectDiv.setAttribute('id', 'projects','d-flex');
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

export default pageLoad;
export {
  show,
  showButton,
  createLabel,
  createInput,
  setWhiteBg,
  setActive,
  addTask,
  loadAllTodos,
  addProjects,
  todoForm,
  projectForm,
  pageLoad,
};