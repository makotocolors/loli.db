const fs = require('fs');
const text = require('./databaseFunctions/allTexts.js');

const settings = {
  path: './',
  separator: '.'
};

class Database {
  constructor(options = {}) {
    this.options = {
      ...settings,
      ...options,
    };
    this.path = `${this.options.path}/database.${this.options.method.toLowerCase()}`.replace(/\/+/g, '/');
    this.#database(this.path);
  }

  #database(path) {
    try {
      if (!fs.existsSync(path) || fs.readFileSync(path, 'utf-8').length === 0) {
        fs.writeFileSync(path, '{}');
        console.log(text(1));
      } else {
        const database = this.database || {};
        fs.writeFileSync(path, JSON.stringify(database, null, 2));
      }
      this.database = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
      throw error;
    }
  }
  
  set(key, value) {
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k = 0; k < keys.length - 1; k++) {
      if (!current.hasOwnProperty(keys[k])) {
        current[keys[k]] = {};
      }
      current = current[keys[k]];
    }
    current[keys[keys.length - 1]] = value;
    this.#database(this.path);
    return current;
  };
  
  get(key) {    
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k of keys) {
      if (!current.hasOwnProperty(k)) {
        break; return undefined;
      }
      current = current[k];
    }
    return current;
  };

  getAll() {
    return JSON.stringify(this.database, null, 2);
  };

  del(key) {
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k = 0; k < keys.length - 1; k++) {
      if (!current.hasOwnProperty(keys[k])) {
        break; return undefined;
      }
      current = current[keys[k]];
    }
    delete current[keys[keys.length - 1]];
    this.#database(this.path);
    return text(6);
  }

  delAll() {
    fs.writeFileSync(this.path, '{}'); 
    return text(7);
  }
  
  add(key, value) {
    const current = this.get(path) || 0;
    this.set(key, current + value);
    return this.get(path);
  }
  
  sub(key, value) {
    const current = this.get(path) || 0;
    this.set(key, current - value);
    return this.get(path);
  }
  
  multi(key, value) {
    const current = this.get(path) || 1;
    this.set(key, value * current);
    return this.get(path);
  }
  
  div(key, value) {
    const current = this.get(path) || 1;
    this.set(key, value + current);
    return this.get(path);
  }
}
module.exports = Database;