const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {client} = require('../db/db');
const { authMiddleware } = require('../middlewares/auth');
// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images/')); // Adjust the path as needed
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// route for fetching all blogs present in db except current user
router.get('/get', authMiddleware, async (req, res) => {
   console.log('blog '+req.user)
   const getResponse = await client.query(`
   SELECT ps.*,us.username
   FROM posts ps JOIN users us
   on us.user_id=ps.user_id
   WHERE ps.user_id <> $1
   `,[req.user])
   console.log(getResponse.rows)
   res.json({
    blogs:getResponse.rows
   })
        
});

// Define the route to handle the file upload
router.post('/create',authMiddleware, upload.single('image'), async function (req, res, next) {
    
    const image = req.file.filename;
    const title = req.body.title;
    const description = req.body.description;
    const user_id = req.user;
    const category = req.body.category
    console.log(req.file)
    console.log(image)
    console.log(title)
    console.log(description)
    console.log(user_id)
    console.log(category)
    // CURRENT_TIMESTAMP

    const createPost = `
    INSERT INTO Posts (title, content, user_id, image, category)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING post_id;
    `
    const uploadedResult = await client.query(createPost,[title,description,user_id,image,category])
    console.log(uploadedResult.rows)
    const insertIntoUpvote = `
    INSERT INTO upvotes (user_id,blog_id) values ($1,$2) returning *
    `
    const insertIntoUpvoteResponse = await client.query(insertIntoUpvote,[req.user,uploadedResult.rows[0].post_id])
    if(insertIntoUpvoteResponse.rows.length){
        return res.json({
            message:"Blog successfully uploaded"
        })
    }
    return res.status(500).json({
        message:"Something error occured"
    })
   
});
// get count of upVotes for each blog
router.get('/getUpVotes',authMiddleware,async function(req,res){
    const {blogId} = req.query
    const userId = req.user
    console.log(blogId)
    let isVotedByUser
    const getUpVotes = `
    SELECT count(*) AS upvotes FROM upvotes WHERE blog_id = $1
    `
    const isVoted = ` SELECT * FROM upvotes WHERE blog_id=$1 and user_id=$2`
    const isVotedResponse = await client.query(isVoted,[blogId,userId])
    const numberOfUpvotes = await client.query(getUpVotes,[blogId])
    if(isVotedResponse.rows.length) isVotedByUser = true
    else isVotedByUser = false
    res.json({
        count:numberOfUpvotes.rows[0].upvotes,
        isVoted:isVotedByUser
    })
})

// upvote and unvote route
router.post('/upvote',authMiddleware,async function(req,res){
    const {blogId} = req.body
    const userId = req.user
    // check if user already voted for it
    const checkVote = `
    SELECT * FROM upvotes where blog_id=$1 and user_id=$2
    `
    const isVotedResponse = await client.query(checkVote,[blogId,userId])
    console.log(isVotedResponse.rows)
    if(isVotedResponse.rows.length){
        console.log('Already voted')
        const unVote = `DELETE FROM upvotes WHERE blog_id=$1 and user_id=$2 returning blog_id`
        const unVoteResponse = await client.query(unVote,[blogId,userId])
        console.log(unVoteResponse.rows)
        res.json({
            isVoted:false
        })
    }
    else {
        console.log('voting....')
        const upVote = `
        INSERT INTO upvotes (blog_id,user_id) values ($1,$2) returning blog_id
        `
        const upVoteResult = await client.query(upVote,[blogId,userId])
        console.log(upVoteResult)
        if(upVoteResult.rows.length){
            res.json({
                isVoted:true
            })
        }
    }
})

module.exports = router;
