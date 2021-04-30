import todo, { Todo } from '../src/task.js'
import projects from '../src/project';
import * as all from '../src/all';
let project;
let index;
let t;
beforeAll(()=>{
    project = projects.createProject('laundry')
    t = todo.createTodo('shoes', 'heels,rubbers,sneakers', '20-01-2021', 'High');
})
describe('createLabel',()=>{
    it('capitalizes the first letter in a label',()=>{
        expect(all.createLabel('new project').textContent).toBe('New project')
    })
    it('gets the attribute of a label',()=>{
        expect(all.createLabel('new project').getAttribute('for')).toBe('new project')
    })
})

describe('createInput',()=>{
    it('capitalizes the first letter in a label',()=>{
        const input= all.createInput('new project','text')
        expect(input.type).toBe('text')
    })
    it('gets the attribute of a input',()=>{
        const input= all.createInput('new project','text')
        expect(all.createInput('new project').getAttribute('id')).toBe('new project')
    })
})


describe('editButton',()=>{
    let parent;
    beforeAll(() => {
        parent= document.createElement('div');
    });    

    it('shows the correct name of the button',()=>{
    all.editButton(project.list, 0, parent)
    const editBtn = parent.querySelector('.edit')
     expect(editBtn.textContent).toBe('Edit')
})
})
  
describe('loadAllTodos',()=>{
    let todoDiv = document.createElement('div')
    
    it('has a todo button for adding a new task',()=>{
        all.loadAllTodos(0, todoDiv);
        const addBtn = todoDiv.querySelector('.add');
        expect(addBtn).not.toBeNull();
    })

})


describe('addProjects',()=>{
    let projectDiv = document.createElement('div')
    let todoDiv = document.createElement('div')
    it('creates a delete button for each project',()=>{
        all.addProjects(projects.getProjectsArray(), 0, projectDiv, todoDiv);
        const btn = projectDiv.querySelector('.delete-project');
        expect(btn).not.toBeNull();
    })

    it('shows the text content of the delete button to be X',()=>{
        all.addProjects(projects.getProjectsArray(), 0, projectDiv, todoDiv);
        const btn = projectDiv.querySelector('.delete-project');
        expect(btn.textContent).toBe('X');
    })

    it('deletes a project when clicked on',()=>{
        const projectLength = (projects.getProjectsArray()).length
        const btn = projectDiv.querySelector('.delete-project');
        btn.click()
        const newProjectLength = (projects.getProjectsArray()).length
        expect(newProjectLength).toBe(projectLength - 1);
    })
})

describe('todoFields', () => {
    it('generates todo  fields with the given parameters', () => {
      const todoFormWrapper = all.todoFields('fieldTest', 'fieldDesc', '20-20-2023', 'High');
      const title = todoFormWrapper.querySelector('#title');
      const desc = todoFormWrapper.querySelector('#description');
      const date = todoFormWrapper.querySelector('#due');
      const priority = todoFormWrapper.querySelector('#priority');
      expect(title).toBeTruthy();
      expect(desc).toBeTruthy();
      expect(date).toBeTruthy();
      expect(priority).toBeTruthy();
    });
  });

  describe('todoForm',()=>{
      it('has a todo form for the todo items',()=>{
        let todoDiv = document.createElement('div')
        const form = all.todoForm(todoDiv);
        expect(form).toBeTruthy();
      })
      it('has a submit button for adding the items',()=>{
        let todoDiv = document.createElement('div')
        const form = all.todoForm(todoDiv);
        const btn = form.querySelector('.submit')
        expect(btn).toBeTruthy();
      })
  })

  
  describe('projectForm',()=>{
      
      it('adds a project form to to fill in a project',()=>{
        let projectDiv = document.createElement('div')
        let todoDiv = document.createElement('div')
        let todoForm = document.createElement('div')
          const form = all.projectForm(projectDiv,todoDiv,todoForm)
          expect(form).toBeTruthy();
      })
      it('creates a project with the project parameters',()=>{
        let projectDiv = document.createElement('div')
        let todoDiv = document.createElement('div')
        let todoForm = document.createElement('div')
        const form = all.projectForm(projectDiv,todoDiv,todoForm)
        const projectName = form.querySelector('.name')
        expect(projectName).toBeTruthy()
      })

      it('has a project form with a title',()=>{
        let projectDiv = document.createElement('div')
        let todoDiv = document.createElement('div')
        let todoForm = document.createElement('div')
        const form = all.projectForm(projectDiv,todoDiv,todoForm)
        const formTitle = form.querySelector('h3')
        expect(formTitle.textContent).toBe('New Project')
      }) 

      it('has a submit button for te project',()=>{
        let projectDiv = document.createElement('div')
        let todoDiv = document.createElement('div')
        let todoForm = document.createElement('div')
        const form = all.projectForm(projectDiv,todoDiv,todoForm)
        const submitBtn= form.querySelector('.submit')
        expect(submitBtn).toBeTruthy()
      })
  })
  