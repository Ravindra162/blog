var express = require('express');
var router = express.Router();
const {client} = require('../db/db')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middlewares/auth');
/* GET users listing. */
router.post('/signup', async function(req, res, next) {
  const {
    username,
    email,
    password
  } = req.body

  const CheckUser = `
  SELECT * from users where username=$1 or email=$2
  `
  const createUser = `
    INSERT INTO users (username, email, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING user_id, username, email, created_at, updated_at
  `;
  const response = await client.query(CheckUser,[username,email])
  console.log(response)
  if(!response.rows.length){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    console.log(hashedPassword)
    const createdUserResponse = await client.query(createUser,[username,email,hashedPassword])
    console.log(createdUserResponse.rows)
    return res.json({
        message:"User created successfully",
        userid:createdUserResponse.rows[0].user_id
    })
    
  }
  return res.send('User already exists')
  
});
router.post('/login', async function(req,res,next){
    const {
        userDetails,
        password
    }   = req.body
    console.log(password)
    const CheckUser = ` SELECT * from users where username=$1 or email=$1`
    const CheckUserResult = await client.query(CheckUser,[userDetails])
    console.log(CheckUserResult)
    if(CheckUserResult.rows.length){
        const result = await bcrypt.compareSync(password, CheckUserResult.rows[0].password_hash); 
        if(result===true){
            const token = jwt.sign({
              user_id:CheckUserResult.rows[0].user_id
            },"secret")
            return res.json({
              message:"login successfull",
              token:token
            })
        }
        else {
          return res.json({
            message:"incorrect password",
            token:""
          })
        }
    }
      return res.json({
        message:"incorrect email or username",
        token:""
      })
    
})
router.get('/get',authMiddleware,async function(req,res,next){
  console.log("get Details")
  const user_id = req.user
  const findUser = ` SELECT username,profile_image FROM users where user_id =$1`
  const findUserResponse = await client.query(findUser,[user_id])
  res.json({
    "userDetails":findUserResponse.rows[0]
  })
})

module.exports = router;
