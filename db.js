
const homedir = require('os').homedir();
const p = require('path')
const fs = require('fs')
const dbpath = p.join(homedir, '.todo')

const db = {
  read(path = dbpath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbpath) {
    return new Promise((resolve, reject) => {
      const listString = JSON.stringify(list)
      fs.writeFile(path, listString, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  },
}

module.exports = db