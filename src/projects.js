import todo from './to-do.js';
import { errors } from './errors.js';


const project = function(n, prios) {
    let _name = n;
    let _todos = [];

    const getName = function() {
        return _name;
    };

    const setName = function(newName) {
        _name = newName;
        return(`Name set to ${newName}`);
    };

    const addTodo = function(name, priority, date, desc='') {
    if (priorityHandler.validatePriority(priority)) {
        let newTodo = todo(name, priority, date, desc);
        _todos.push(newTodo);
        return newTodo;
        };
    };

    const removeTodo = function(i) {
        _todos.splice(i, 1);
    };

    const getTodos = function() {
        for (let i = 0; i < _todos.length; i++) {
            let todo = _todos[i];
        };
        return _todos;
    };

    const getCompleted = function() {
        let completed = [];
        for (let i = 0; i < _todos.length; i++) {
            if (_todos[i].isComplete()) completed.push(_todos[i]);
        };
        return completed
    };

    return {getName, setName, addTodo, removeTodo, getTodos, getCompleted};
};

const priorityHandler = (function() {
    let _priorities = ['low', 'medium', 'high'];
    function validatePriority(prio) {
        if (_priorities.indexOf(prio) == -1) {
            console.log(`Accepted values are: ${priorityHandler.getPriorities()}`);
            errors.priorityError();
        } else return true;
    };
    
    function setPriority(toDo, prio) {
        if (validatePriority(prio)) {
            toDo.setPriority(prio);
        };
    };

    const getPriorities = function() {
        return _priorities;
    };

    return { validatePriority, setPriority, getPriorities };
})();

export { project };