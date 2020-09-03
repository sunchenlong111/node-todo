#!/usr/bin/env node
const program = require('commander')
const api = require('./index')


program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const arg = args.slice(0, -1).join(' ')
    api.add(arg).then(() => { console.log('add successfully') }, () => { console.log('add failed') })
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => { console.log('clear successfully') }, () => { console.log('clear failed') })
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  api.showAll()
}