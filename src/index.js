import project from './project';
import todo from './task';
import page from './all';
import storageModule from './storage';
// import './reset.css';
import './style.css';

if (!localStorage.projects) {
  project.createProject('Example', [todo.createTodo('New Todo', 'You can create Todos', '12-10-2021', 1)]);
} else {
  storageModule.loadLocal();
}

page(project.getProjectsArray());