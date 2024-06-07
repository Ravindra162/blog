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
//get username and email
router.get('/get',authMiddleware,async function(req,res,next){
  console.log("get Details")
  const user_id = req.user
  const findUser = ` SELECT username,email,profile_image FROM users where user_id =$1`
  const findUserResponse = await client.query(findUser,[user_id])
  res.json({
    "userDetails":findUserResponse.rows[0]
  })
})
//get userBlogs and Voted-blogs
router.get('/profile', authMiddleware, async function( req, res){
  const userId = req.user
  const userBlogs = `
  SELECT * from posts where user_id = $1
  `
  const userBlogsResponse = await client.query(userBlogs,[userId])
  const allUserBlogs = userBlogsResponse.rows
  const votedUserBlogs = `SELECT blog_id from upvotes WHERE user_id = $1`
  const votedUserBlogsResponse = await client.query(votedUserBlogs,[userId])
  let allVotedUserBlogs = []
  for(var i=0;i<votedUserBlogsResponse.rows.length;i++){
    const blogDetails  = await client.query( `SELECT * from posts where post_id=$1`,[votedUserBlogsResponse.rows[i].blog_id])
    allVotedUserBlogs.push(blogDetails.rows[0])
  }
  res.json({
    userBlogs:allUserBlogs,
    votedUserBlogs:allVotedUserBlogs
  })


})
// follow or unfollow user
router.post('/follow', authMiddleware, async (req, res) => {
  const followerId = req.user;
  const followedId = req.body.followedId; 
  try {
    // Check if the user is already following other one
    const isFollowingQuery = `
      SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2
    `;
    const isFollowedResponse = await client.query(isFollowingQuery, [followerId, followedId]);

    if (isFollowedResponse.rows.length) {
      // Unfollow
      const unFollowQuery = `
        DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2 RETURNING follower_id
      `;
      const unFollowResponse = await client.query(unFollowQuery, [followerId, followedId]);

      if (unFollowResponse.rows.length) {
        return res.json({ message: 'Unfollowed' });
      } else {
        return res.status(500).json({ error: 'Failed to unfollow' });
      }
    } else {
      // Follow
      const followQuery = `
        INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2) RETURNING followed_id
      `;
      const followResponse = await client.query(followQuery, [followerId, followedId]);

      if (followResponse.rows.length) {
        return res.json({ message: 'Followed' });
      } else {
        return res.status(500).json({ error: 'Failed to follow' });
      }
    }
  } catch (err) {
    console.error('Error in follow/unfollow operation:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
