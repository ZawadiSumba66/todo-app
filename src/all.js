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
const submitProject = document.querySelector('.btn-project')
const allProjects = document.querySelector('.added')
const tasksForm = document.querySelector('.tasks-form')
const projectForm = document.querySelector('.project-form')


const addTask = (list,index)=>{
    const row = document.createElement('tr');
    const cellOne = document.createElement('td');
    cellOne.textContent = title.value  ;
    row.appendChild(cellOne);
  
    const cellTwo = document.createElement('td');
    cellTwo.textContent =description.value
    row.appendChild(cellTwo);
  
    const cellThree = document.createElement('td');
    cellThree.textContent = date.value;
    row.appendChild(cellThree); 

    const cellFour = document.createElement('td');
    cellFour.textContent = priority.value;
    row.appendChild(cellFour);
    const deleteTaskBtn = document.createElement('button')
    deleteTaskBtn.innerHTML = 'Delete' 
    deleteTaskBtn.addEventListener('click', () => {
        myTasks.deleteTask(list, index);
    });
    row.appendChild(deleteTaskBtn)
    tableBody.appendChild(row)
    return tableBody
}


const addTasks=(index,div)=>{
    const todoDiv = div;
    const projectArr = myProjects.projectsArray();
    tableBody.innerHTML = '';
  
    if (projectArr.length === 0) { return; }
  
    const { list } = projectArr[index];
    for (let i = 0; i < list.length; i += 1) {
      const newDiv = addTask(list, i);
      todoDiv.appendChild(newDiv);
    }
    tasksForm;

}

const addProject = ()=>{
    const singleProject = document.createElement('li');
    singleProject.innerHTML = inputProject.value
    allProjects.appendChild(singleProject)
    return allProjects
}


const addProjects = ( projects=allProjects, current=0, pDiv, tDiv) =>{
    // const projectDiv = document.createElement('div')
    const todoDiv = tDiv;
    allProjects.innerHTML = '';
    for (let i = 0; i < projects.length; i += 1) {
      const newDiv =  document.createElement('div');
      newDiv.classList.add('d-flex');
      projects[i].current = false;
      if (i === current) {
        projects[i].current = true;
      }
      const projectSpan = document.createElement('li');
      projectSpan.classList.add('project');
      const deleteProjectBtn = document.createElement('button');
      deleteProjectBtn.textContent = 'X';
      deleteProjectBtn.addEventListener('click', () => {
        if (projects[i]) {
          myProjects.deleteProject(i);
        allProjects.removeChild(newDiv);
          addTasks(0, todoDiv);
        }
        // } else {
        //   myProjects.deleteProject(i);
        //   addProjects(projects, myProjects.currentProject(), projectDiv, todoDiv);
        // }
      });
      projectSpan.classList.add('pointer');
      projectSpan.textContent = projects[i].name;
      projectSpan.addEventListener('click', () => {
        const todo = tasksForm
         addTasks(i, todoDiv);
        projects[i].current= true;
      });
      newDiv.appendChild(projectSpan);
      newDiv.appendChild(deleteProjectBtn);
       allProjects.appendChild(newDiv)
    }
}

const todoForm = (tDiv) => {
    const todoDiv = tDiv;
    const form = tasksForm
    
    submitTask.addEventListener('click', (e) => {
      e.preventDefault();
      const newTask = myTasks.createTask(title.value, description.value, date.value, priority.value);
      const arr = myProjects.projectsArray();
    //   const index = form.id;
      for(let i=0;i<arr.length;i++){
        arr[i].addTodo(newTask);
        if (arr[i].some((task)=>task.title === title.value)){return;}
        addTasks(index, todoDiv);
      }
      title.value = ''
      description.value = ''
      date.value =''
    });
    
    return form;
  };

  const fillProject = (pDiv, tDiv) => {
    const projectDiv = pDiv;
    const todoDiv = tDiv;
    const form = projectForm
  
    submitProject.addEventListener('click', (e) => {
      e.preventDefault();
      myProjects.createProject(inputProject.value);
      const arr = myProjects.projectsArray();
      addProjects(arr, arr.length - 1, projectDiv, todoDiv);
      addTasks(arr.length - 1, todoDiv);
      inputProject.value = ''
    });
      
    return form;
  };
  
  
export {addTask,todoForm,fillProject,addProjects,addTasks}
