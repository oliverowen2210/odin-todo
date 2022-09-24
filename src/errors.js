const errors = (function() {
    const noProjectSelected = function() {
        throw 'No project has been selected!';
    };

    const noTodoSelected = function() {
        throw 'No task has been selected!';
    };

    const blankProjectName = function() {
        throw 'No project name has been input!';
    };

    const priorityError = function() {
        throw 'Invalid priority value!';
    };

    const invalidGridMode = function() {
        throw 'Invalid grid mode! Must be "project" or "task"';
    };

    return {noProjectSelected, noTodoSelected, blankProjectName, priorityError, invalidGridMode}
})();

export {errors}