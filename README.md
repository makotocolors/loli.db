# loliness-database
***A simple and fast local database!***

### Introduction:
This module was inspired by other modules like [simple-json-db](https://github.com/nmaggioni/Simple-JSONdb) and [quick.db](https://github.com/plexidev/quick.db). These have similar features and functions, however, I wanted to bring a clean line of code with features that I consider useful, without leaving aside the ease for the user.

### Characteristics:
- [Key-value](https://redis.com/nosql/key-value-databases/)-based usage method.
- Database organization in [JSON](https://redis.com/blog/what-are-json-databases/).
- Simple, organized and therefore fast code.

### Plans for the future:
- [ ] Possibility to set and get entire strings in the database. 
- [ ] Possibility to define a separator.
- [ ] Possibility to define a default value for a key. **db.def()** function will be created for this.
- [ ]  Possibility of **db.set()** not overwriting a value that is already saved in the database. **db.rep()** function will be created for this. 

## Basic setup:
In this way, it is possible to import the file to use the functions:
```js
const Database = require('./database.js');
const db = new Database;
```

It is also possible to define the location where the database will be saved:
```js
const db = new Database('./path/database.json');
```

## Basic usage:
### `db.set('key', 'value')`
**db.set()** is a function used to set a key and a value in the database. 
```js
db.set('user', 'makoto');
```
It is also possible to define specific positions in the database using the separator. The default separator is "`.`".
```js
db.set('user.id', 001);
```

### `db.get('key')`
**db.get()** is a function used to get a value from a key in the database.
```js
db.get('user');
// Use console.log() to view the response.
```
It is also possible to define specific positions in the database using the separator.
```js
db.get('user.id');
// Use console.log() to view the response.
```

## Advanced usage:
### `db.getAll()`
**db.getAll()** is a function used to get the entire database.
```JavaScript
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');

db.getAll();
// Use console.log() to view the response.
```

### `db.del('key')`
**db.del()** is a function used to delete a key and a value from the database.
```js
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');

db.del('user.age');
//Use db.get() or db.getAll() together with console.log() to view the response. 
```

### `db.delAll()`
**db.delAll()** is a function used to delete the entire database.
```js
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');

db.delAll();
//Use db.get() or db.getAll() together with console.log() to view the response. 
```

## Math functions

- You can **add** using "`db.add`".
```js
db.set('default', 100);
db.add('default', 10);

const value = db.get('default');
console.log(value);

//expected response "110".
```

- You can **sub** using "`db.sub`".
```js
db.set('default', 100);
db.sub('default', 10);

const value = db.get('default');
console.log(value);

//expected response "90".
```

- You can **multiply** using "`db.mult`".
```js
db.set('default', 100);
db.mult('default', 2);

const value = db.get('default');
console.log(value);

//expected response "200".
```

- You can **divide** using "`db.div`".
```js
db.set('default', 100);
db.div('default', 2);

const value = db.get('default');
console.log(value);

//expected response "50".
```
