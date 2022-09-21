const errorHandler = (function() {
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

    const invalidTodoButtonState = function() {
        throw 'Invalid todo button class! Must be "new" or "Edit"';
    }
    return {noProjectSelected, noTodoSelected, blankProjectName, priorityError}
})();

export {errorHandler}