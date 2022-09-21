import todo from './to-do.js';
import { errorHandler } from './errors.js';


const project = function(n, prios) {
    let name = n;
    let _todos = [];

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
            console.log(`${i+1}. ${todo.getName()}, priority: ${todo.getPriority()}, due: ${todo.getDate()}, completed: ${todo.isComplete()}`);
        };
        return _todos;
    };

    return {name, addTodo, removeTodo, getTodos};
};

const priorityHandler = (function() {
    let _priorities = ['low', 'medium', 'high'];
    function validatePriority(prio) {
        if (_priorities.indexOf(prio) == -1) {
            console.log(`Accepted values are: ${priorityHandler.getPriorities()}`);
            errorHandler.priorityError();
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

