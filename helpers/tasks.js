module.exports.filter = (tasks, filterBy) => {
    if (filterBy === 'done') {
        tasks = tasks.filter(task => task.done)
        return tasks;
    }

    if (filterBy === 'undone') {
        tasks = tasks.filter(task => !task.done);
        return tasks;
    }

    return tasks;
}

module.exports.order = (tasks, order) => {
    if (order === 'asc')
        return tasks = tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    return tasks = tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

module.exports.slice = (tasks, pp, page) => {
    return tasks.slice(pp * page, pp * page + pp);
}