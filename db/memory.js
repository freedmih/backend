const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports.addTask = async task => {

    const uuid = crypto.randomUUID();

    try {
        var tasks = JSON.parse(await readFile('db.json', 'utf-8'));
    }
    catch (e) {
        return e;
    }

    tasks.push({
        uuid,
        ...task,
        createdAt: new Date().toUTCString(),
    })

    try {
        await writeFile('db.json', JSON.stringify(tasks));
    }
    catch(e) {
        return e;
    }

    return uuid;
}

module.exports.removeTask = async taskUUID => {

    try {
        var tasks = JSON.parse(await readFile('db.json', 'utf-8'));
    }
    catch(e) {
        return e;
    }

    const index = tasks.findIndex(task => task.uuid === taskUUID);
    if (index === -1) {
        return {
            code: 404,
            message: "Task not found"
        };
    }

    tasks.splice(index, 1);

    try {
        await writeFile('db.json', JSON.stringify(tasks));
    }
    catch(e) {
        return e;
    }

    return {
        code: 204
    };
}

module.exports.patchTask = async taskToPatch => {
    try {
        var tasks = JSON.parse(await readFile('db.json', 'utf-8'));
    }
    catch(e) {
        return e;
    }

    const index = tasks.findIndex(task => task.uuid === taskToPatch.uuid);
    if (index === -1) {
        return {
            code: 400,
            message: "Task not created"
        };
    }

    tasks[index] = { ...tasks[index], ...taskToPatch };

    try {
        await writeFile('db.json', JSON.stringify(tasks));
    }
    catch(e) {
        return e;
    }

    return {
        code: 200,
    };
}

module.exports.getTasks = async () => {
    try {
        return JSON.parse(await readFile('db.json', 'utf-8'));
    }
    catch (e) {
        return e;
    }
}