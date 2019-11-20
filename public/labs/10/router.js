var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes/edit', function(req, res, next) {

    const id = req.query.id;

    if (id) {
        let results = {};

        // TODO: Lookup the data and provide results to the view 
        // to show an existing quote

        res.render('../public/labs/10/edit', {
            title: 'Jason\'s Lab 10',
            data: results
        });
    }
    else {
        res.render('../public/labs/10/edit', {
            title: 'Jason\'s Lab 10',
        });
    }

});

router.post('/quotes/edit', function(req, res, next) {

    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    connection.query(
        'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)', 
        [req.body.authorId, req.body.quote, req.body.category], // assuming POST
        (error, results, fields) => {
            if (error) throw error;
            res.json({
                id: results.insertId
            });
        });

    connection.end();

});

module.exports = router;
