const taskList = (title,description,date,priority)=>{
  return { title, description, date, priority}
}
let tasks = []
const createTask = (title,description,date,priority)=>{
  const newTask = taskList(title, description, date, priority)
  tasks.push(newTask)
  return newTask
}

const deleteTask= (index) =>{
  tasks.splice(index,1)
} 

export {createTask,deleteTask,TaskList}