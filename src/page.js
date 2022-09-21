import { project } from './projects.js';

const projects = [];
let selectedProject;

function init() {
    const page = document.querySelector('body');

    const projectCreationModal = document.createElement('div');
    projectCreationModal.id = 'project-creation';

    const projectList = document.createElement('select');
    const projectListPlaceholder = document.createElement('option');
    projectListPlaceholder.textContent = 'Select a project';
    projectListPlaceholder.value = 'project-placeholder';
    projectList.value = 'project-placeholder';

    const projectNameInput = document.createElement('input');
    projectNameInput.placeholder = 'Project Name';

    const createProjectButton = document.createElement('button');
    createProjectButton.addEventListener('click', () => {
        let newProj = project(projectNameInput.value);
        projects.push(newProj);    
        wipeProjectList();
        populateProjectList();
        projectNameInput.value = null;
        selectedProject = newProj;
        window.selected = selectedProject;
        return newProj;
    });

    createProjectButton.textContent = 'create project';


    
    projectListPlaceholder.hidden = true;

    projectList.append(projectListPlaceholder);

    const populateProjectList = function() {
        for (let i=0;i<projects.length;i++) {
            let proj = document.createElement('option');
            proj.value = i;
            proj.textContent = projects[i].name;
            projectList.append(proj);
        };
    };

    projectList.addEventListener("change", () => {
        selectedProject = projects[projectList.value];
        window.selected = selectedProject;
        wipeInputs();
    })

    const wipeProjectList = function() {
        while(projectList.firstChild) {
            projectList.removeChild(projectList.lastChild);
        };
        projectList.append(projectListPlaceholder);
    };
    
    const wipeInputs = function() {
        todoNameInput.value = null;
        priorityInput.value = 'placeholder';
        dateInput.value = null;
        descInput.value = null;
    };
    
    const deleteProject = function(i) {
        projects.splice(i, 1);
    }

    const projectCreateDiv = document.createElement('div');
    projectCreateDiv.append(projectNameInput, createProjectButton);

    const todoNameInput = document.createElement('input');
    todoNameInput.placeholder = 'Task Name';

    const priorityInput = document.createElement('select');

    const placeholderPriority = document.createElement('option');
    placeholderPriority.textContent = 'Task priority';
    placeholderPriority.value = 'placeholder';
    priorityInput.value = 'placeholder';
    placeholderPriority.hidden = true;

    const lowPriority = document.createElement('option');
    lowPriority.value = 'low';
    lowPriority.textContent = 'Low';

    const midPriority = document.createElement('option');
    midPriority.value = 'medium';
    midPriority.textContent = 'Medium';

    const highPriority = document.createElement('option');
    highPriority.value = 'high';
    highPriority.textContent = 'High';

    priorityInput.append(placeholderPriority, lowPriority, midPriority, highPriority);

    const dateInput = document.createElement('input');
    dateInput.type = 'datetime-local';

    const descInput = document.createElement('textarea');
    descInput.placeholder = 'Task description (optional)'

    const createTodo = document.createElement('button');
    createTodo.addEventListener('click', () => {
        if (!selectedProject) throw 'No projects have been created!';
        let r = selectedProject.addTodo(todoNameInput.value, priorityInput.value, dateInput.value, descInput.value);
        wipeInputs();
        return r;
    })

    createTodo.textContent = 'create todo';

    projectCreationModal.append(projectCreateDiv, projectList, todoNameInput, priorityInput, 
                                dateInput, descInput, createTodo);

    page.append(projectCreationModal);
}

export { init }