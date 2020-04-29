When it's time to deploy to heroku:

Step #1 --> Add start script in package.json .... "start": "node index.js"

Step #2 --> Inside index.js, include const port = process.env.port || 4000; so that we now have an environment variable. Heroku will use this to assign us a port.

Step #3 --> npm install dotenv -- allows us to configure some environment variables locally in development mode.. inside our .env file (make sure this shows up inside your .gitignore)

Step #4 --> inside index.js --> require('dotenv').config(); ... then restart server

Step # 5 --> Deploy on Heroku

Step # 6 -->

Other Notes:

\*\* When we deploy to heroku, it assigns us an environment variable
console.log(process.env) <-- This is a built in node object that is designed to hold environment variables!
Envrionment variables are variables that transcend a specific file. process.env is kind of a master list of variables that can be shared across an entire repository. This where we will find our port.

DATA PERSISTENCE --> Data that we want to save. Data that we waant to stay the same unless we mess with it..

RELATIONAL DATABASES --> Things are stored in tables with rows and columns...ID's play an important role...they are the oldest, most "tried and true" type of databases..
columns are called "fields"
rows are called "records"

How to query the database: (select, insert, update, delete)

1. SELECT \* FROM Customers;
2. INSERT INTO Customers (customerName, contactName, Address, City, postalcode, country) VALUES ("Lambda School", "Austin Allred", "1 Lambda Ct", "Provo", "84601", "USA");
3. UPDATE Customers SET city = "Silicon Valley", postalCode = "93848"; WHERE customerName = "Lambda School";
4. DELETE FROM Customers WHERE CustomerID = 39;

Why do we care about SQL? .. most programmers in the real world actually suck at it and only know the very very basics..

Knex.js --> Query builder language. It essentially allows you to build SQL queries using JavaScript.

Knex statements are ALL asynchronous .. so are API calls. (They take time to access the DB).

const express = require('express');

// database access using knex
const db = require('../data/db-config.js'); // << renamed to knex from db

const router = express.Router();
// SELECT \* FROM posts

router.get('/', (req, res) => {
db.select('\*')
.from('posts')
.then((posts) => {
res.status(200).json(posts);
})
.catch((error) => {
console.log(error);
res.status(500).json({ errorMessage: 'Error getting the posts ' });
});
});

router.get('/:id', (req, res) => {
// select _ from posts where id = req.params.id
knex
.select('_')
.from('posts')
// .where("id", "=", req.params.id)
.where({ id: req.params.id })
.first() // equivalent to posts[0]
.then((post) => {
res.status(200).json(post);
})
.catch((error) => {
console.log(error);
res.status(500).json({ errorMessage: 'Error getting the post' });
});
});

router.post('/', (req, res) => {
// INSERT INTO Posts (all of the keys from req.body) VALUES ( all of the values from req.body)
const postData = req.body;

db('posts')
.insert(postData)
.then((ids) => {
res.status(201).json({ newPost: ids[0] });
})
.catch((error) => {
console.log('post error', error);
res.status(500).json({ message: 'Faialed to insert post' });
});
});

router.put('/:id', (req, res) => {
const { id } = req.params;
const changes = req.body;
db('posts')
.where({ id })
.update(changes)
.then((count) => {
if (count) {
res.json({ updated: count });
} else {
res.status(404).json({ message: 'invalid post id' });
}
})
.catch((error) => {
res.status(500).json({ message: 'failed to update post' });
});
});

router.delete('/:id', (req, res) => {
const { id } = req.params;
// DELETE FROM Posts WHERE id = id
db('posts')
.where({ id })
.del()
.then((count) => {
if (count) {
res.json({ deleted: count });
} else {
res.status(404).json({ message: 'invalid post id' });
}
})
.catch((error) => {
res.status(500).json({ message: 'failed to delete post' });
});
});

module.exports = router;
