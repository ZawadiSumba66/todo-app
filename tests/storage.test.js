import * as projects from '../src/project';
import storage from '../src/storage';

describe('saveLocal', () => {
    it('save the projects array', () => {
      storage.saveLocal();
      expect(JSON.parse(localStorage.projects)).toEqual(projects.projectModule.getProjectsArray());
    });
  });