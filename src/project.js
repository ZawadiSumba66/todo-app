function ProjectList(name,list =[]){
  this.name = name
  this.list = list

}

ProjectList.prototype.addTodo = function (task) {
  this.list.push(task);
};

let projects = []
const createProject = (name,list=[])=>{
  const newProject = new ProjectList(name, list)
  projects.push(newProject)
  return newProject
}

const projectsArray=()=>projects

const deleteProject= (index) =>{
  projects.splice(index,1)
} 

export {createProject,deleteProject,ProjectList,projectsArray}