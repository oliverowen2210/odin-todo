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

    function isComplete() {
        return completed;
    };

    function setPriority(prio) {
        priority = prio;
    };

    function complete() {
        completed = true;
    };

    return {getName, getPrio, getDate, setDesc, getDesc, isComplete, setPriority, complete}
};





export default todo;