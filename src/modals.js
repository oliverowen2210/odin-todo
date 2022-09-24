//project modal
const populateProjectList = function() {
    for (let i=0;i<projects.length;i++) {
        let proj = document.createElement('option');
        proj.value = i;
        proj.textContent = projects[i].getName();
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

//todo modal
const wipeTodoList = function() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    };
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



