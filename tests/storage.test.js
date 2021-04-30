import * as projects from '../src/project';
import storage from '../src/storage';

describe('saveLocal', () => {
    it('saves projects in the local storage', () => {
      storage.saveLocal();
      expect(JSON.parse(localStorage.projects)).toEqual(projects.projectModule.getProjectsArray());
    });
  });