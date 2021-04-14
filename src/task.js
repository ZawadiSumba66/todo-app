const taskList = (title,description,date,priority)=>{
  return { title, description, date, priority}
}

const createTask = (title,description,date,priority)=>{
  const newTask = taskList(title, description, date, priority)
  return newTask
}

const deleteTask= (list,index) =>{
  list.splice(index,1)
} 

export {createTask,deleteTask}