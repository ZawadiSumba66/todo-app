import './style.css';
import * as myTasks from './task'
import * as myProjects from './project'


const title = document.querySelector('#title')
const description = document.querySelector('#description')
const date = document.querySelector('#date')
const tableBody = document.querySelector('.table-tasks')
const submitTask = document.querySelector('.submit-task')
const priority = document.querySelector('#priority')
const inputProject = document.querySelector('#project')
const selectProject = document.querySelector('#select-project')
const submitProject = document.querySelector('.btn-project')
const allProjects = document.querySelector('.added')

const taskForm = (task)=>{
    const row = document.createElement('tr');
    const cellOne = document.createElement('td');
    cellOne.textContent = task.title;
    row.appendChild(cellOne);
  
    const cellTwo = document.createElement('td');
    cellTwo.textContent = task.description;
    row.appendChild(cellTwo);
  
    const cellThree = document.createElement('td');
    cellThree.textContent = task.date;
    row.appendChild(cellThree);

    const cellFour = document.createElement('td');
    cellFour.textContent = task.priority;
    row.appendChild(cellFour);

    
    // const deleteTodo=myTasks.deleteTask(index)
    // deleteTodo.innerHTML='Delete'
    // row.appendChild(deleteTodo)
    tableBody.appendChild(row);
}
const projectsList = myProjects.projectsArray()
const updateTasks=()=>{
    projectsList.forEach((project)=>{
        project.forEach((task, index) => taskForm(task, index));
})}

const addTasks=()=>{
   const newTask = myTasks.createTask(title.value,description.value,date.value,priority.value)
    // const selectTasks = myTasks.allTasks()
    // if (addTodo(newTask).some((task) => task.title === title.value)) { return; }
    projectsList.forEach((project)=>{
    if (project.addTodo(newTask).some((task) => task.title === title.value)) { return; }})
    title.value = '';
    description.value = '';
    date.value = '';

    updateTasks()
}
submitTask.addEventListener('click',addTasks)

const addProjects = () =>{
   const newProject=myProjects.createProject(inputProject.value)
    const project = document.createElement('li');
    project.innerHTML = newProject
    allProjects.appendChild(project)
    fillProject.value=''
}
submitProject.addEventListener('click',addProjects)

export {taskForm ,updateTasks,addProjects,addTasks}
// function updateTasks() {
//     tableBody.innerHTML = '';
//     tasks.forEach((task, index) => taskForm(task, index));
//   }
  
//   function addToTasks() {
//     const myTask= taskList(title.value, description.value, date.value, priority.value, selectProject.value);
//     if (tasks.some((task) => task.title === title.value)) { return; }
  
//     tasks.push(myTask);
//     title.value = '';
//     description.value = '';
//     date.value = '';
//     updateTasks();
//   }
// submitTask.addEventListener('click',addToTasks)

// const projectInput = document.querySelector('#project');
// const allProjects = document.querySelector('.added')
// const buttonProject = document.querySelector('.btn-project')

// const addProject=()=>{
//   const project = document.createElement('li');
//   project.innerHTML = projectInput.value
//   allProjects.appendChild(project)
//   projectInput.value =''
// }
// buttonProject.addEventListener('click',addProject)
// export default addProject

// export default addToTasks