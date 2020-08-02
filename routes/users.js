const express = require('express');
const router = express.Router();

const pool = require('../utils/mysql')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
  const connection = await pool.getConnection();
  const [results] = await connection.query('SELECT * FROM ACCOUNT_TB');
  let sum = 0;
  for (let user of results) {
    sum += user.MONEY;
  }
  const avg = sum / results.length;
  const [results2] = await connection.query('SELECT * FROM ACCOUNT_TB WHERE MONEY > ?', [avg])
  res.json({status:200, arr: results2});
} catch (err) {
   res.json({stastus:500, msg:'에러!'});
}

/*  connection.query('SELECT * FROM ACCOUNT_TB', (err, results) =>{
    let sum = 0;
    for (let user of results) {
       sum += user.MONEY;
    }
    const avg = sum / results.length;
    connection.query('SELECT * FROM ACCOUNT_TB WHERE MONEY > ?', [avg], (err, results) =>{
      res.json({status:200, arr: results});
    })
    
  }) */
     
  
});

router.get('/hoho', function(req, res, next) {
  res.send('ㅎㅎㅎ');
});

router.get('/koko', function(req, res, next) {
  res.json({status:200, msg:'성공'});
});

router.get('/giveme', function(req, res, next) {
  let number = Math.random();
  res.json({status: number, msg:'성공'});
});

module.exports = router;
