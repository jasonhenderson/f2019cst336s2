var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {

    const sql = `
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
`;

    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    connection.query(sql, (error, results, fields) => {
        if (error) throw error;

        res.render('../public/labs/10json/index', {
            title: 'Quote Manager List',
            quotes: results
        });
    });

    connection.end();

});

router.get('/quote/:id', function(req, res, next) {

    const id = req.params.id;

    if (!id || id.length === 0) {
        return res.json({
            error: 'no id provided',
            data: null
        });
    }

    // TODO: Lookup the data and provide results to the view 
    // to show an existing quote

    const sql = `
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE q.quoteId = ?
`;

    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    connection.query(sql, [id],
        (error, results, fields) => {

            if (error) {
                return res.json({
                    error: error.message,
                    data: null
                });
            }

            res.json({
                error: null,
                data: results[0] // get first element of results 
            });
        });

    connection.end();

});

router.post('/quotes/edit', function(req, res, next) {

    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    if (req.body.quoteId) {
        connection.query(
            'UPDATE l9_quotes SET authorId = ?, quote = ?, category = ? WHERE quoteId = ?', [req.body.authorId, req.body.quote, req.body.category, req.body.quoteId], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.quoteId
                });
            });
    }
    else {
        connection.query(
            'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)', [req.body.authorId, req.body.quote, req.body.category], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.insertId
                });
            });
    }

    connection.end();

});

module.exports = router;
