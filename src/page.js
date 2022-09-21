import { project } from './projects.js';
import { errorHandler } from './errors.js';




function init() {
    const page = document.querySelector('body');
    const projects = [];
    let selectedProject;
    let selectedTodo;

    //why does DOM manipulating code always end up
    //looking like spaghetti
    function createProject() {
        if (projectNameInput.value == '') errorHandler.blankProjectName();
        let newProj = project(projectNameInput.value);
        projects.push(newProj);    
        updateProjectList();
        newProj.index = projects.indexOf(newProj);
        selectProject(newProj.index);
        return newProj;
    }

    const selectProject = function(i) {
        selectedProject = projects[i];
        projectList.value = i;
    };

    
    const populateProjectList = function() {
        for (let i=0;i<projects.length;i++) {
            let proj = document.createElement('option');
            proj.value = i;
            proj.textContent = projects[i].name;
            projectList.append(proj);
        };
    };

    const wipeProjectList = function() {
        while(projectList.firstChild) {
            projectList.removeChild(projectList.lastChild);
        };
        projectList.append(projectListPlaceholder);
    };

    const updateProjectList = function() {
        wipeProjectList();
        populateProjectList();
    };

    const clearProjectName = function() {
        projectNameInput.value = null;
    };
    
    const wipeInputs = function() {
        todoNameInput.value = null;
        priorityInput.value = 'placeholder';
        dateInput.value = null;
        descInput.value = null;
    };
    
    const deleteProject = function(i) {
        projects.splice(i, 1);
    };

    const getInputValues = function() {
        return [todoNameInput.value, priorityInput.value, dateInput.value, descInput.value];
    };


    const setInputValues = function(vals) {
        //expecting array of name, prio, date and desc
        todoNameInput.value = vals[0];
        priorityInput.value = vals[1];
        dateInput.value = vals[2];
        descInput.value = vals[3];
    };

    const createTodo = function() {
        if (!selectedProject) errorHandler.noProjectSelected();
        let newTodo = selectedProject.addTodo(todoNameInput.value, priorityInput.value, dateInput.value, descInput.value);
        wipeInputs();
        wipeTodoList();
        populateTodoList();
        return newTodo;
    };

    const editTodo = function() {
        if (!selectedProject) errorHandler.noProjectSelected();
        if (!selectedTodo) errorHandler.noTodoSelected();
        selectedTodo.update(getInputValues());
    };

    const selectTodo = function() {
        if (todoList.value == 'new') {
            setTodoButton('new');
            return wipeInputs();
        };
        selectedTodo = selectedProject.getTodos()[todoList.value];
        setInputValues(selectedTodo.getData());
        setTodoButton('edit');
    };

    const clearSelectedTodo = function() {
        selectedTodo = null;
    };

    const setTodoButton = function(state) {
        if (state == 'new') {
            todoButton.classList.add('new');
            todoButton.classList.remove('edit');
            todoButton.textContent = 'New task';
        } else if (state == 'edit') {
            todoButton.classList.add('edit');
            todoButton.classList.remove('new');
            todoButton.textContent = 'Update task';
        } else errorHandler.invalidTodoButtonState;
    };
    

    const deleteTodo = function() {
        if (!selectedTodo) errorHandler.noTodoSelected();
        console.log(selectedTodo);
        selectedProject.removeTodo(selectedTodo);
    };

    const populateTodoList = function() {
        todoList.append(newTodoOption);
        let todos = selectedProject.getTodos();
        for (let i = 0;i < todos.length;i++) {
            let todo = document.createElement('option');
            todo.value = i;
            todo.textContent = todos[i].getName();
            todoList.append(todo);
        };
    };

    const resetModal = function() {
        wipeInputs();
        wipeTodoList();
        populateTodoList();
        clearSelectedTodo();
        setTodoButton('new');
    };

    const wipeTodoList = function() {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.lastChild);
        };
    };

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
        createProject();
        clearProjectName();
        resetModal();
    });

    createProjectButton.textContent = 'create project';

    const projectCreateDiv = document.createElement('div');
    projectCreateDiv.append(projectNameInput, createProjectButton);

    projectList.addEventListener("change", () => {
        selectProject(projectList.value);
        resetModal();
    })

    projectListPlaceholder.hidden = true;
    projectList.append(projectListPlaceholder);

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

    const todoButton = document.createElement('button');
    todoButton.addEventListener('click', () => {
        if (todoButton.classList.contains('new')) createTodo();
        else editTodo();
    });
    setTodoButton('new');

    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.addEventListener('click', () => {
        if (!selectedTodo) errorHandler.noTodoSelected();
        resetModal();
    });
    deleteTodoButton.textContent = 'Delete task'

    const todoList = document.createElement('select');
    const newTodoOption = document.createElement('option');
    newTodoOption.value = 'new';
    newTodoOption.textContent = 'New task';
    todoList.append(newTodoOption);

    todoList.addEventListener('change', () => {
        if (todoList.value == 'new') {
            resetModal();
            return;
        };
        selectTodo();
    });

    projectCreationModal.append(projectCreateDiv, projectList, todoNameInput, priorityInput, 
                                dateInput, descInput, todoButton, todoList, deleteTodoButton);

    page.append(projectCreationModal);
}



export { init }