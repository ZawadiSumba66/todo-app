const projectInput = document.querySelector('#project');
const allProjects = document.querySelector('.added')
const buttonProject = document.querySelector('.btn-project')

const addProject=()=>{
  const project = document.createElement('li');
  project.innerHTML = projectInput.value
  allProjects.appendChild(project)
}
buttonProject.addEventListener('click',addProject)
export default addProject