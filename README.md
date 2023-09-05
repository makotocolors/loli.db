# loliness-db
A simple and fast local JSON database!

# Basic setup
Importing the database for use.
```js
const Database = require('./database.js');
const db = new Database;
```

You can also define a location where the database will be stored.
```js
const Database = require('./database.js');
const db = new Database('./path/database.json');
```

# Basic usage
- Using "`db.set()`" and "`db.get()`" functions to **set** keys and values and **get** values by key respectively.
```js
db.set('user', 'makoto');

const user = db.get('user');
console.log(user);

//expected response "makoto".
```

- Creating **subkeys**. The default separator is "`.`".
```js
db.set('user.id', 001);

const id = db.get('user.id');
console.log(id);

//expected response "001". 
```

# Advanced usage
- You can use the "`db.getAll()`" function to get the entire database.
```js
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');

const data = db.getAll();
console.log(data);

\* expected response:
{
  "user": {
    "name": "makoto",
    "age": 18,
    "sex": "male"
  }
}
*/
```

- You can delete a single value from the database using "`db.del()`".
```js
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');
db.del('user.age');

const data = db.getAll();
console.log(data);

\* expected response:
{
  "user": {
    "name": "makoto",
    "age": {},
    "sex": "male"
  }
}
*/
```

- ⚠️ You can delete the entire database using "`db.delAll()`".
```js
db.set('user.name', 'makoto');
db.set('user.age', 18);
db.set('user.sex', 'male');
db.delAll();

const data = db.getAll();
console.log(data);

\* expected response:
{}
*/
```

# Math functions

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
