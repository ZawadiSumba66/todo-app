import projects from '../src/project';

let project;
beforeAll(() => {
  project = projects.createProject('Laundry');
});

describe('create project', () => {
  it('Creates a project with the given parameters', () => {
    expect(project.name).toBe('Laundry');
  });
  it('Returns the length of the projects in the project array', () => {
    expect(projects.getProjectsArray().length).toBe(1);
  });
});

describe('deleteProject', () => {
  it('Deletes a project from the project array', () => {
    projects.deleteProject(0);
    expect(projects.getProjectsArray().length).toBe(0);
  });
});

describe('addTodo', () => {
  it('Adds a new task to a project', () => {
    project.addTodo('shopping', 'cutlery,bowls,dishes', '20-01-2021', 'High');
    project.addTodo('shopping', 'cutlery,bowls,dishes', '20-01-2021', 'High');
    expect(project.list.length).toBe(2);
  });
});