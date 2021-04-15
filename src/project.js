function ProjectList(name,list =[],current=false){
  this.name = name
  this.list = list
  this.current = current
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

const currentProject = () => {
  for (let i = 0; i < projects.length; i += 1) {
    if (projects[i].current) {
      return i;
    }
  }
  return 0;
};


const projectsArray=()=>projects

const deleteProject= (index) =>{
  projects.splice(index,1)
} 

export {createProject,deleteProject,ProjectList,projectsArray,currentProject}