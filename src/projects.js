import { todo, todoFactory } from './to-do.js';

function project(n) {
    let _name = n;
    let _todos = [];

    const addTodo = function(name, priority, date, desc='') {
        let newTodo = toDo(name, priority, date, desc);
        _todos.push(newTodo);
    };

    const removeTodo = function(i) {
        _todos.splice(i, 1);
    };

    const getTodos = function() {
        return _todos;
    };

    return {addTodo, removeTodo, getTodos}
}

export default project;