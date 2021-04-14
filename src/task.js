const taskList = (title,description,date,priority)=>{
  return { title, description, date, priority}
}
let tasks = []
const createTask = ()=>{
  const newTask = taskList(title, description, date, priority)
  tasks.push(newTask)
}

const deleteTask= (index) =>{
  tasks.splice(index,1)
} 

export default (createTask,deleteTask)