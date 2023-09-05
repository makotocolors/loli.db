const fs = require('fs');

class Database {
  constructor(path = './database.json') {
    this.path = path;
    this.#loadDatabase();
  }

  #saveDatabase() {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(this.path, JSON.stringify(this.database, null, 2));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  #loadDatabase() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.database = JSON.parse(data);
    } catch (error) {
      this.database = {};
      this.#saveDatabase().then(() => {
        console.log('A new database was generated at:', this.path);
      }).catch((error) => {
        console.error('An error occurred while generating the database!:', error.message);
      });
    }
  }

  set(path, value) {
    if (!path) return console.log('Specify a key.');
    if (!value) return console.log('Specify a value.');
    
    const keys = path.split('.');
    let current = this.database;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    this.#saveDatabase();
    return 'Saved to the database successfully!';
  }

  get(path) {
    if (!path) return console.log('Specify a key.');
    
    const keys = path.split('.');
    let current = this.database;
    for (const key of keys) {
      if (!current[key]) return undefined;
      current = current[key];
    }
    return current;
  }

  getAll() {
    return JSON.stringify(this.database, null, 2);
  }

  del(path) {
    if (!path) return console.log('Specify a key.');
    
    const keys = path.split('.');
    let current = this.database;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) return;
      current = current[keys[i]];
    }
    delete current[keys[keys.length - 1]];
    this.#saveDatabase();
    return 'Deleted from the database successfully!'
  }

  delAll() {
    this.database = {};
    this.#saveDatabase();
    return 'Database cleaned successfully!'
  }
  
  add(path, amount) {
    if (typeof path !== 'string') return;
    if (typeof amount !== 'number') return;
    
    const value = this.get(path);
    this.set(path, value + (amount || 0));
  }
  
  sub(path, amount) {
    if (typeof path !== 'string') return;
    if (typeof amount !== 'number') return;
    
    const value = this.get(path);
    this.set(path, value - (amount || 0));
  }
  
  mult(path, amount) {
    if (typeof path !== 'string') return;
    if (typeof amount !== 'number') return;
    
    const value = this.get(path);
    this.set(path, value * (amount || 1));
  }
  
  div(path, amount) {
    if (typeof path !== 'string') return;
    if (typeof amount !== 'number') return;
    
    const value = this.get(path);
    this.set(path, value / (amount || 1));
  }
}

module.exports = Database;
