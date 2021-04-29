import todo, { Todo } from '../src/task.js'
import projects from '../src/project';
let t;
let project;
beforeAll(() => {
  project= projects.createProject('Laundry')
  t = todo.createTodo('shoes', 'heels,rubbers,sneakers', '20-01-2021', 'High');
  project.addTodo(t)
});

describe('create todo' ,()=>{
it('creates a todo with the given parameters', () => {
  expect(t.title).toBe('shoes');
  expect(t.description).toBe('heels,rubbers,sneakers');
  expect(t.date).toBe('20-01-2021');
  expect(t.priority).toBe('High');
});

it('creates does not create an todo with the given parameters', () => {
  expect(t.title).not.toBe('beddings');
  expect(t.description).not.toBe('duvets,sheets');
  expect(t.date).not.toBe('20-01-2020');
  expect(t.priority).not.toBe('Low');
})

})

 
describe('deleteTodo',()=>{
  it('deletes a todo from the project list',()=>{
     todo.deleteTodo(project.list,0)   
     expect(project.list.length).toBe(0) 
  })
})

describe('edit',()=>{
  it('Edits an entry of a todo',()=>{
    t.edit('shoes','heels,rubbers,sneakers','20-01-2021','Low')
    expect(t.title).toBe('shoes');
    expect(t.description).toBe('heels,rubbers,sneakers');
    expect(t.date).toBe('20-01-2021');
    expect(t.priority).toBe('Low');
  })
})