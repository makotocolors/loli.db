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
    this.#load();
  };

  #load() {
    try {
      if (!fs.existsSync(this.path) || fs.readFileSync(this.path, 'utf-8').length === 0) {
        fs.writeFileSync(this.path, '{}');
        console.log(text(1));
      } else {
        this.database = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      }
    } catch (error) {
      throw error;
    }
  };
  
  #save() {
    fs.writeFileSync(this.path, JSON.stringify(this.database, null, 2));
    this.#load();
  };

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
    this.#save();
    return current;
  };
  
  get(key) {    
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k of keys) {
      if (!current.hasOwnProperty(k)) {
        return undefined;
      }
      current = current[k];
    }
    return current;
  };
  
  del(key) {
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k = 0; k < keys.length - 1; k++) {
      if (!current.hasOwnProperty(keys[k])) {
        return undefined;
      }
      current = current[keys[k]];
    }
    delete current[keys[keys.length - 1]];
    this.#save();
    return text(6);
  };

  add(key, value) {
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k of keys) {
      if (!current.hasOwnProperty(k)) {
        current[k] = Array.isArray(current[k]) ? current[k] : [];
      }
      current = current[k];
    }
    current.push(value);
    this.#save();
    return current[keys[keys.length - 1]];
  };

  rem(key, value) {
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k of keys) {
      if (!current.hasOwnProperty(k) || !Array.isArray(current[k])) {
        return undefined;
      }
      current = current[k];
    }
    const index = current.indexOf(value);
    if (index !== -1) {
      current.splice(index, 1);
      this.#save();
      return current;
    }
    return undefined;
  };
  
  has(key, value) {
    const keys = key.split(this.options.separator);
    let current = this.database;
    for (let k of keys) {
      if (!current.hasOwnProperty(k) || !Array.isArray(current[k])) {
        return false;
      }
      current = current[k];
    }
    for (let i = 0; i < current.length; i++) {
      if (current[i] === value) {
        return true;
      }
    }
    return false;
  };
  
  all() {
    return JSON.stringify(this.database, null, 2);
  };
  
  clear() {
    fs.writeFileSync(this.path, '{}');
    this.#load();
    return text(7);
  };
  
  sum(key, value) {
    const current = this.get(key) || 0;
    this.set(key, current + value);
    return current + value;
  };
  
  sub(key, value) {
    const current = this.get(key) || 0;
    this.set(key, current - value);
    return current - value;
  };
  
  multi(key, value) {
    const current = this.get(key) || 1;
    this.set(key, current * value);
    return current * value;
  };
  
  div(key, value) {
    const current = this.get(key) || 1;
    this.set(key, current / value);
    return current / value;
  };
};

module.exports = Database;