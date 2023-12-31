# loli.db
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
- [ ] Possibility to define a default value for a key. **db.def()** function will be created for this. **More informations soon.**
- [ ] Possibility to switch the database organization mode between JSON and SQL. 
- [ ] Possibility to change between `classic` and `modern` usage mode. **More Informations soon.**

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
// You can also use console.log() to view the response.
```
It is also possible to define specific positions in the database using the separator. The default separator is "`.`".
```js
db.set('user.id', 001);
// You can also use console.log() to view the response.
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
// Use db.get() or db.getAll() together with console.log() to view the response.
```

### `db.delAll()`
**db.delAll()** is a function used to delete the entire database.
```js
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');

db.delAll();
// Use db.get() or db.getAll() together with console.log() to view the response. 
```

## Math functions
### `db.add('key', value)`
**db.add()** is a function used to get a value from a key in the database, perform the mathematical addition operation with this value and the numeric value you specify, and finally set the result in the database by overwriting the old value.
```js
db.set('default', 100);

db.add('default', 10);
// Use db.get() or db.getAll() together with console.log() to view the response. 
```

### `db.sub('key', value)`
**db.sub()** is a function used to get a value from a key in the database, perform the mathematical subtraction operation with this value and the numeric value you specify, and finally set the result in the database by overwriting the old value.
```js
db.set('default', 100);

db.sub('default', 10);
// Use db.get() or db.getAll() together with console.log() to view the response. 
```


### `db.multi('key', value)`
**db.multi()** is a function used to get a value from a key in the database, perform the mathematical multiplication operation with this value and the numeric value you specify, and finally set the result in the database by overwriting the old value.
```js
db.set('default', 100);

db.multi('default', 2);
// Use db.get() or db.getAll() together with console.log() to view the response. 
```

### `db.div('key', value)`
**db.div()** is a function used to get a value from a key in the database, perform the mathematical division. operation with this value and the numeric value you specify, and finally set the result in the database by overwriting the old value.
```js
db.set('default', 100);

db.div('default', 2);
// Use db.get() or db.getAll() together with console.log() to view the response. 
```
#
> **Made with ❤️ by *Makoto Colors!***
