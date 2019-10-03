const express = require('express');
const router = express.Router();

const userNames = ["eddy", "ted", "teddy", "eddie", "edward"];

/* GET users listing. */
router.get('/username/:name', function(req, res, next) {
    if (userNames.includes(req.params.name)) {
        res.status(200).send("Unavailable");
    }
    else {
        res.status(200).send("Available");
    }
});

module.exports = router;
