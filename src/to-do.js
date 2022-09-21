function todo(n, prio, date, desc) {
    let name = n;
    let priority = prio;
    let dueDate = date;
    let description = desc;
    let completed = false;


    function getName() {
        return name;
    };

    function getPriority() {
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

    function getData() {
        return[name, priority, date, description, completed];
    };

    function update(vals) {
        name = vals[0];
        priority = vals[1];
        date = vals[2];
        desc = vals[3];
    };

    function complete() {
        completed = true;
        console.log(`${name} completed!`);
    };

    return {getName, getPriority, getDate, setDesc, getDesc, isComplete, setPriority, getData, update, complete}
};





export default todo;