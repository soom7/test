const express = require('express');
const router = express.Router();

const pool = require('../utils/mysql')

connection.connect();

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../join.html'))
})

router.post('/', function(req,res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;

    var query = connection.query('INSERT INTO users (email, name, password) values ("' + email + '","' + name + '","' + passwd + '")', function(err, rows) {
        if(err) { throw err;}
        console.log("Data inserted!");
    })
})



module.exports = router;