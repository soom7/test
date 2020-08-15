const express = require('express');
const router = express.Router();

const pool = require('../utils/mysql')

const crypto = require('crypto');

const jwt = require('jsonwebtoken')

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

router.get('/:id', async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const id = req.params.id;
    if (payload.id !== Number(id)) {
      return res.json({status:403, msg:'권한없음'})
    }
    const connection = await pool.getConnection();
    const [result] = await connection.query('SELECT * FROM ACCOUNT_TB WHERE ID = ?', [id])
    res.json({status:200, arr: result}) 
    } catch (err) {
     res.json({status:401, msg:'권한없음'})
    }
  } catch (err){
    console.log(err);
    res.json({ status:500, msg:'에러!'})
  }
})

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name
    const money = req.body.money;
    const pwd = req.body.pwd;

    const salt = await crypto.randomBytes(64);
    const saltString = salt.toString('base64')
    const hashedPwd = crypto.pbkdf2Sync(pwd, saltString, 100000, 64, 'SHA512');
    const hashedPwdString = hashedPwd.toString('base64')

    const connection = await pool.getConnection();
    await connection.query('INSERT INTO ACCOUNT_TB(NAME, MONEY, HASHED_PWD, PWD_SALT) VALUES(?,?,?,?)', [name, money, hashedPwdString, saltString])
    res.json({ status: 201, msg: 'success' })
  } catch (err){
    console.log(err);
    res.json({ status:500, msg:'에러!'})
  }
})
/*
router.post('/login', async (req, res, next) => {
  try {
    const name = req.body.name
    const pwd = req.body.pwd;

    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM ACCOUNT_TB WHERE NAME = ?', [name]);
    if (users.length === 0) {
      return res.json({status:401, msg: '없는 아이디'})
    }
    const user = users[0];
    
    const loginHashedPwd = crypto.pbkdf2Sync(pwd, user.PWD_SALT, 100000, 64, 'SHA512');
    if (loginHashedPwd.toString('base64') !== user.HASHED_PWD) {
      return res.json({ status:401, msg: '틀린 비번'})
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.json({status:200, token : token })

  } catch (err){
    console.log(err);
    res.json({ status:500, msg:'에러!'})
  }
})
*/

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
