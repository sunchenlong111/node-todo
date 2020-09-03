
const db = require('./db')
const inquirer = require('inquirer')
module.exports.add = async (title) => {
  // 读取之前的任务
  let list = await db.read()
  // 往里面添加一个任务
  list.push({
    title,
    done: false
  })
  //存储任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

function taskAsDone(list, num) {
  list[num].done = true
  db.write(list)
}

function taskAsUnDone(list, num) {
  list[num].done = false
  db.write(list)
}

function updateTitle(list, num) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: 'new title',
    default: list[num].title
  }).then(answer3 => {
    list[num].title = answer3.title
    db.write(list)
  })
}

function remove(list, num) {
  list.splice(num, 1)
  db.write(list)
}


function askForTasks(list, num) {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'please choose your option',
    choices: [
      { name: 'quit', value: 'quit' },
      { name: 'task as done', value: 'taskAsDone' },
      { name: 'task as unDone', value: 'taskAsUnDone' },
      { name: 'update task title', value: 'updateTitle' },
      { name: 'remove task', value: 'remove' }
    ]
  }).then(answer2 => {
    const taskActions = { taskAsDone, taskAsUnDone, updateTitle, remove }
    const doAction = taskActions[answer2.action]
    doAction && doAction(list, num)
  })
}

function createTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: 'add new task title ',
  }).then(answer => {
    list.push({
      title: answer.title,
      done: false
    })
    db.write(list)
  })
}

function printTasks(list) {
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: 'please select your task',
    choices: [{ name: 'quit', value: '-1' }, ...list.map((task, index) => {
      return { name: `${task.done ? '[x]' : '[_]'} ${index + 1}-${task.title}`, value: index.toString() }
    }), { name: 'add task', value: '-2' }]
  }).then((answer) => {
    const num = parseInt(answer.index)
    if (num >= 0) {
      // 选中了某个任务
      // askForTasks
      askForTasks(list, num)
    } else if (num === -2) {
      // 创建任务
      createTask(list)
    }
  })
}

module.exports.showAll = async () => {
  const list = await db.read()
  // printTasks
  printTasks(list)
}



