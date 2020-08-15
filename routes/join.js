const express = require('express');
const router = express.Router();

const pool = require('../utils/mysql')


router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../join.html'))
})

router.post('/', async (req, res) => {
   try { const body = req.body;
    const email = body.email;
    const name = body.name;
    const passwd = body.password;
    
    const connection = await pool.getConnection()
    const [results] = await connection.query('INSERT INTO users (email, name, password) values (?, ?, ?)', [email, name, passwd]);
  
    console.log(results);

    res.json({stastus:200, msg:'성공!'});
   } catch (err){
    console.log(err)
    res.json({status:500, msg:'에러!'})
   }
  })



module.exports = router;