function todo(n, prio, date, desc) {
    let name = n;
    let priority = prio;
    let dueDate = date;
    let description = desc;
    let completed = false;


    function getName() {
        return name;
    };

    function getPrio() {
        return priority;
    };

    function getDate() {
        return dueDate;
    };

    function setDesc(newDesc) {
        description = newDesc;
        return ('description set to ' + newDesc);
    };

    function getDesc() {
        return description;
    };

    function getStatus() {
        return completed;
    };

    function setPriority(prio) {
        if (todoController.validatePriority(prio)) {
            this.priority = prio;
        };
    };
    

    function changeStatus() {
        completed = !completed;
    };

    return {getName, getPrio, getDate, setDesc, getDesc, getStatus, setPriority, changeStatus }
};

const todoController = (function() {
    const priorities = ['low', 'medium', 'high']
    function validatePriority(prio) {
        if (priorities.indexOf(prio) == -1) {
            todoError.priorityError();
        } else return true;
    };

    function getPriorities() {
        return priorities;
    };

    return { validatePriority, getPriorities };
})();

const todoError = (function() {
    function priorityError() {
        throw `Invalid priority value! Accepted values are: ${todoController.getPriorities()}`;
    };

    return { priorityError };
})();

function todoFactory(name, prio, date, desc='') {
    if (todoController.validatePriority(prio)) {
        return (todo(name, prio, date, desc));
    };

};


export { todo, todoFactory };