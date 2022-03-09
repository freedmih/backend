const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

const { filter, order, slice } = require("./tasks");

const { Task } = require("../models/task.model");

const { ValidationError } = require("./error");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports.addTask = async task => {

    const uuid = crypto.randomUUID();

    await Task.create({
        uuid,
        ...task
    })

    return uuid;
}

module.exports.removeTask = async uuid => {
    return await Task.destroy({
        where: { uuid }
    });
}

module.exports.patchTask = async taskToPatch => {
    var tasks = JSON.parse(await readFile('db.json', 'utf-8'));

    const index = tasks.findIndex(task => task.uuid === taskToPatch.uuid);
    if (index === -1) {
        throw new ValidationError('Task not created', 400);
    }

    tasks[index] = { ...tasks[index], ...taskToPatch };

    await writeFile('db.json', JSON.stringify(tasks));

    return index;
}

module.exports.getTasks = async ({ filterBy, orderBy, pp, page }) => {
    const tasks = await Task.findAll();

    const filtered = filter(tasks, filterBy);
    const ordered = order(filtered, orderBy);
    const sliced = slice(ordered, pp, page);

    return sliced;
}