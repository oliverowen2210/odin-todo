import './style.css';
import { project } from './projects.js';
import { errors } from './errors.js';

const page = (function() {
    const elements = (function() {
        const header = (function() {
            const _header = document.querySelector('header');
            const _headerText = document.querySelector('header h1');

            const setText = function(str) {
                _headerText.textContent = str;
            };
    
            const setMode = function(str) {
                if (str != 'grid' && str != 'project') errors.invalidGridMode;
        
                _header.removeAttribute('class');
                if (str == 'grid') {
                    _header.classList.add('grid-header');
                } else if (str == 'project') {
                    _header.classList.add('project-header');
                };
            };
            return {setText, setMode}
        })();

        const grid = (function() {
            const _grid = document.querySelector('main');
            let _gridMode;

            const _wipeGrid = function() {
                _grid.removeAttribute('class');
                while (_grid.firstChild) {
                    _grid.removeChild(_grid.lastChild);
                };
            };
        
            const setMode = function(str) {
                if (str != 'project' && str != 'task') errors.invalidGridMode;
                _wipeGrid();
                if (str == 'project') {
                    _gridMode = 'project';
                    header.setMode('grid');
                    _grid.classList.add('project-grid');
                } else if (str == 'task') {
                    _gridMode = 'task'
                    header.setMode('project');
                    _grid.classList.add('task-grid');
                };
            };

            const addProject = function(project) {
                if (_gridMode != 'project') errors.invalidGridMode();
                let projectContainer = document.createElement('div');
                projectContainer.classList.add('project');
                let projectName = document.createElement('span');
                projectName.classList.add('project-name');
                let projectTasks = document.createElement('span');
                projectTasks.classList.add('project-tasks');
                let projectCompleted = document.createElement('span');
                projectCompleted.classList.add('project-completed');
            
                projectName.textContent = project.getName();
                projectTasks.textContent = project.getTodos().length + ' tasks';
                projectCompleted.textContent = project.getCompleted().length + ' completed';
            
                projectContainer.append(projectName, projectTasks, projectCompleted);
                projectContainer.addEventListener('click', () => {
                    page.elements.header.setText(project.getName());
                });
                _grid.append(projectContainer);
            };

            return {setMode, addProject};
        })();

    return {header, grid};
    })();
    
    const projects = (function() {
        let _selected;
        let _projects = [];
        const create = function(name) {
            let newProj = project(name);
            _projects.push(newProj);
            select(_projects.indexOf[newProj]);
            return newProj;
        };
        
        const select = function(i) {
            _selected = _projects[i];
        };

        const getSelected = function() {
            return _selected;
        };

        const clearSelected = function() {
            _selected = null;
        };
    
        const deleteSelected = function(i) {
            _projects.splice(i, 1);
        };
    
        const getAll = function() {
            return _projects;
        };

        return {create, select, getSelected, clearSelected, deleteSelected, getAll};
    })();

    const todos = (function() {
        let _selected;
        const create = function() {
            if (!projects.getSelected()) errors.noProjectSelected();
            let newTodo = selectedProject.addTodo(todoNameInput.value, priorityInput.value, dateInput.value, descInput.value);
            return newTodo;
        };

        const select = function() {
            _selected = selectedProject.getTodos()[todoList.value];
        };

        const getSelected = function() {
            return _selected;
        };
    
        const updateSelected = function() {
            if (!selectedProject) errors.noProjectSelected();
            if (!_selected) errors.noTodoSelected();
            _selected.update(getInputValues());
        };
    
        const clearSelected = function() {
            _selected = null;
        };
    
        const deleteSelected = function() {
            if (!_selected) errors.noTodoSelected();
            console.log(_selected);
            selectedProject.removeTodo(_selected);
        };

        return {create, select, getSelected, updateSelected, clearSelected, deleteSelected};
    })();

    return {elements, projects, todos};
})();

page.elements.grid.setMode('project');
const defaultProject = page.projects.create('My project');
page.elements.grid.addProject(defaultProject);
page.elements.header.setText(defaultProject.getName());

const testButton = document.querySelector('header button');
testButton.addEventListener('click', () => {
    page.elements.grid.setMode('task');
});