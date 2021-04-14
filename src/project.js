function ProjectList(name,allprojects =[]){
  this.name=name
  this.allprojects=allprojects
}

ProjectList.prototype.addTask=(task)=>{
  this.allprojects.push(task)
}

let projects = []
const createProject = ()=>{
  const newProject = projectList(name, allprojects)
  projects.push(newProject)
}

const deleteProject= (index) =>{
  projects.splice(index,1)
} 

export default {addTask,createProject,deleteProject}