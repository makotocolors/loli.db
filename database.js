const fs = require('fs');

class Database {
  constructor(path = './database.json', options = { method: 'JSON', usage: 'classic', separator: '.' }) {
    if (process.getuid && process.getuid() === 0) {
      throw new Error('Running as root is not allowed.');
    }

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
        console.error('An error occurred while generating the database:', error.message);
      });
    }
  }

  set(path, value) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }
    
    if (!value) {
      throw new Error('Specify a value.');
    }

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
    
    return this.get(path);
  }

  get(path) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }
    
    const keys = path.split('.');
    let current = this.database;
    for (const key of keys) {
      if (current[key] === undefined) return undefined;
      current = current[key];
    }
    
    return current;
  }

  getAll() {
    return JSON.stringify(this.database, null, 2);
  }

  del(path) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }

    const keys = path.split('.');
    let current = this.database;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) return;
      current = current[keys[i]];
    }
    delete current[keys[keys.length - 1]];
    this.#saveDatabase();
    
    return 'Successfully deleted from the database!';
  }

  delAll() {
    this.database = {};
    this.#saveDatabase();
    
    return 'Database was successfully cleaned!';
  }
  
  add(path, amount) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }
    
    if (!amount) {
      throw new Error('Specify a value.');
    } else if (typeof amount !== 'number') {
      throw new Error('The value must be a number.');
    }
    
    const value = this.get(path)||0;
    this.set(path, value + amount);

    return this.get(path);
  }
  
  sub(path, amount) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }
    
    if (!amount) {
      throw new Error('Specify a value.');
    } else if (typeof amount !== 'number') {
      throw new Error('The value must be a number.');
    }
    
    const value = this.get(path)||0;
    this.set(path, value - amount);

    return this.get(path);
  }
  
  multi(path, amount) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }
    if (!amount) {
      throw new Error('Specify a value.');
    } else if (typeof amount !== 'number') {
      throw new Error('The value must be a number.');
    }
    
    const value = this.get(path)||1;
    this.set(path, value * amount);

    return this.get(path);
  }
  
  div(path, amount) {
    if (!path) {
      throw new Error('Specify a key.');
    } else if (typeof path !== 'string') {
      throw new Error('The key must be a string.');
    }
    if (!amount) {
      throw new Error('Specify a value.');
    } else if (typeof amount !== 'number') {
      throw new Error('The value must be a number.');
    }
    
    const value = this.get(path)||1;
    this.set(path, value / amount);

    return this.get(path);
  }
}

module.exports = Database;
