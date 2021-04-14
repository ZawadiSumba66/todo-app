import './style.css';
import * as myTasks from './task'
import * as myProjects from './projects'

const title = document.querySelector('#title')
const description = document.querySelector('#description')
const date = document.querySelector('#date')
const tableBody = document.querySelector('.table-tasks')
const submitTask = document.querySelector('.submit-task')
const priority = document.querySelector('#priority')
const selectProject = document.querySelector('#select-project')


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

    const cellFive = document.createElement('td');
    cellFive.textContent = task.selectProject;
    row.appendChild(cellFive);
  
    tableBody.appendChild(row);
}

const addTasks=()=>{
    const newTask = myTasks.createTask(title.value,description.value,date.value,priority.value)
    myProjects.addTask(newTask)
}
submitTask.addEventListener('click',addTasks)

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