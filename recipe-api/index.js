const mysql = require('mysql')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000

app.use(cors())

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(express.json())

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect(function(err) {
    if (err) throw err;
})

function findOne(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM recipe WHERE id = ${id}`, function (err, result, fields) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

function findOneCategory(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM category WHERE id = ${id}`, function (err, result, fields) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

// CRUD FOR RECIPE

app.get('/recipes', (req, res) => {
    // envoyer la liste des recettes SELECT
    const sql = "SELECT * FROM recipe";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/recipes/:id', async (req, res) => {
    const result = await findOne(req.params.id)
    res.send(result)
})

app.post('/recipes', (req, res) => {
    // créer une recette
    const recipe = req.body;
    console.log(recipe);
    const category = recipe.category === undefined ? "" : recipe.category;
    const sql = `INSERT INTO recipe (title, category) VALUES ('${recipe.title}', '${category}')`;
    con.query(sql, async (err, result) => {
        if (err) throw err;
        
        const recipe = await findOne(result.insertId)
        res.send(recipe)
    });
})

app.put('/recipes/:id', (req, res) => {
    const id = req.params.id;
    const recipe = req.body;

    
    const sql = "UPDATE recipe SET title = ?, category = ? WHERE id = ?";
    con.query(sql, [recipe.title, recipe.category, id] , async (err, result) => {
        if (err) throw err;
        
        const recipe = await findOne(req.params.id)
        res.send(recipe)
    })
})

app.delete('/recipes/:id', (req, res) => {
    const sql = "DELETE FROM recipe WHERE id = ?";
    con.query(sql, [req.params.id] ,function (err, result) {
        if (err) throw err;
        res.sendStatus(200);
    })
})

// CRUD FOR CATEGORY

app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/categories/:id', async (req, res) => {
    const result = await findOneCategory(req.params.id)
    res.send(result)
})

app.post('/categories', (req, res) => {
    const category = req.body;
    console.log(category);
    const sql = `INSERT INTO category (name) VALUES ('${category.name}')`;
    con.query(sql, async (err, result) => {
        if (err) throw err;
        console.log(result);

        const category = await findOneCategory(result.insertId)
        res.send(category)
    });
})

app.put('/categories/:id', (req, res) => {
    const id = req.params.id;
    const category = req.body;
    const sql = "UPDATE category SET name = ? WHERE id = ?";
    con.query(sql, [category.name, id], async (err, result) => {
        if (err) throw err;

        const category = await findOneCategory(id)
        res.send(category)
    })
})

app.delete('/categories/:id', (req, res) => {
    const sql = "DELETE FROM category WHERE id = ?";
    con.query(sql, [req.params.id] ,function (err, result) {
        if (err) throw err;
        res.sendStatus(200);
    })
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})