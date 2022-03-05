const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports.addTask = async task => {
    
    const uuid = crypto.randomUUID();

    const tasks = JSON.parse(await readFile('db.json', 'utf-8'));

    tasks.push({
        uuid,
        ...task,
        createdAt: new Date().toUTCString(),
    })

    await writeFile('db.json', JSON.stringify(tasks));

    return uuid;
}

module.exports.tryRemoveTask = async taskUUID => {

    const tasks = JSON.parse(await readFile('db.json', 'utf-8'));

    const index = tasks.findIndex(task => task.uuid === taskUUID);
    if(index === -1) {
        return false;
    }

    tasks.splice(index, 1);

    await writeFile('db.json', JSON.stringify(tasks));

    return true;
}

module.exports.tryPatchTask = async taskToPatch => {

    const tasks = JSON.parse(await readFile('db.json', 'utf-8'));

    const index = tasks.findIndex(task => task.uuid === taskToPatch.uuid);
    if(index === -1) {
        return {
            code: 400,
            message: "Task not created"
        };
    }

    tasks[index] = { ...tasks[index], ...taskToPatch };

    await writeFile('db.json', JSON.stringify(tasks)); 

    return {
        code: 200,
    };
}

module.exports.getTasks = async () => JSON.parse(await readFile('db.json', 'utf-8'));