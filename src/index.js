import project from './project';
import todo from './task';
import page from './all';
import storageModule from './storage';
import './style.css';

if (!localStorage.projects) {
  project.createProject('Default', [todo.createTodo('New Todo', 'You can create Todos', '12-10-2021', 1)]);
} else {
  storageModule.loadLocal();
}

page(project.getProjectsArray());