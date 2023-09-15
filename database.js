const fs = require('node:fs');

const settings = {
  path: './',       // Can also be any.
  method: 'JSON',   // Can also be 'SQL'.
  usage: 'classic', // Can also be 'modern'.
  separator: '.'    // Can also be any.
};

class Database {
  constructor(options = {}) {
    if (process.getuid && process.getuid() === 0) {
      throw new Error(this.#text('blockedAccess'));
    }

    this.options = {
      ...settings,
      ...options,
    };
    
    this.path = `${this.options.path}/database.${this.options.method.toLowerCase()}`.replaceAll('//', '/');
    this.#loadDatabase();
  }

  #text(id, additional) {
    switch (id) {
      case 'blockedAccess': return 'Running as a root is not allowed.';
        break;
      case 'newDatabase': return 'A new database was generated at: \x1b[32m' + additional + '\x1b[0m.';
        break;
      case 'generatingError': return 'An error occurred while generating the database: \x1b[31m' + additional + '\x1b[0m.';
        break;
      case 'missingKey': return 'Specify a key.';
        break;
      case 'stringError': return 'The key must be a string.';
        break;
      case 'missingValue': return 'Specify a value.';
        break;
      case 'numberError': return 'The value must be a number.';
        break;
      case 'successfullyDeleted': return 'Successfully deleted from the database!';
        break;
      case 'successfullyCleaned': return 'Database was successfully cleaned!';
        break;
      default: return 'Something wrong has occurred.';
        break;
    }
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
        console.log(this.#text('newDatabase', this.path));
      }).catch((error) => {
        console.error(this.#text('generatingError', error.message));
      });
    }
  }

  set(path, value) {
    if (!path) {
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
    }
    
    if (!value) {
      throw new Error(this.#text('missingValue'));
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
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
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
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
    }

    const keys = path.split('.');
    let current = this.database;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) return;
      current = current[keys[i]];
    }
    delete current[keys[keys.length - 1]];
    this.#saveDatabase();
    
    return this.#text('successfullyDeleted');
  }

  delAll() {
    this.database = {};
    this.#saveDatabase();
    
    return this.#text('successfullyCleaned');
  }
  
  add(path, amount) {
    if (!path) {
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
    }
    
    if (!amount) {
      throw new Error(this.#text('missingValue'));
    } else if (typeof amount !== 'number') {
      throw new Error(this.#text('numberError'));
    }
    
    const value = this.get(path)||0;
    this.set(path, value + amount);

    return this.get(path);
  }
  
  sub(path, amount) {
    if (!path) {
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
    }
    
    if (!amount) {
      throw new Error(this.#text('missingValue'));
    } else if (typeof amount !== 'number') {
      throw new Error(this.#text('numberError'));
    }
    
    const value = this.get(path)||0;
    this.set(path, value - amount);

    return this.get(path);
  }
  
  multi(path, amount) {
    if (!path) {
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
    }
    if (!amount) {
      throw new Error(this.#text('missingValue'));
    } else if (typeof amount !== 'number') {
      throw new Error(this.#text('numberError'));
    }
    
    const value = this.get(path)||1;
    this.set(path, value * amount);

    return this.get(path);
  }
  
  div(path, amount) {
    if (!path) {
      throw new Error(this.#text('missingKey'));
    } else if (typeof path !== 'string') {
      throw new Error(this.#text('stringError'));
    }
    if (!amount) {
      throw new Error(this.#text('missingValue'));
    } else if (typeof amount !== 'number') {
      throw new Error(this.#text('numberError'));
    }
    
    const value = this.get(path)||1;
    this.set(path, value / amount);

    return this.get(path);
  }
}

module.exports = Database;
