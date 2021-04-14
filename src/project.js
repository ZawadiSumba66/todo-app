function ProjectList(name,list =[]){
  this.name=name
  this.list = list
}

ProjectList.prototype.addTask=(task)=>{
  this.list.push(task)
}

let projects = []
const createProject = ()=>{
  const newProject = projectList(name, allprojects)
  projects.push(newProject)
}


const deleteProject= (index) =>{
  projects.splice(index,1)
} 

export {addTask,createProject,deleteProject,ProjectList}