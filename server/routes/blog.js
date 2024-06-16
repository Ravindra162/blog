const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
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
router.post('/create',authMiddleware, async function (req, res, next) {
    console.log(req.body)
    const {base64,title,html,category} = req.body;
    const user_id = req.user;
    // const category = req.body.category
    // console.log(req.file)
    // console.log(image)
    // console.log(title)
    // console.log(description)
    // console.log(user_id)
    // console.log(category)
    // CURRENT_TIMESTAMP

    const createPost = `
    INSERT INTO Posts (title, content, user_id, image, category)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING post_id;
    `
    const uploadedResult = await client.query(createPost,[title,html,user_id,base64,category])
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

router.put('/update/:blogId',authMiddleware,upload.single('image'),async(req,res)=>{
    const blogId = req.query.blogId
    const userId = req.user
    const image = req.body.base64;
    const title = req.body.title;
    const description = req.body.html;
    const user_id = req.user;
    const category = req.body.category
    console.log(blogId)
    console.log(image)
    console.log(title)
    console.log(description)
    console.log(user_id)
    console.log(category)
    // CURRENT_TIMESTAMP
    const post = await client.query(
        `SELECT * FROM posts WHERE post_id=$1 AND user_id=$2`,
        [blogId, userId]
    );

    if (post.rows.length === 0) {
        return res.status(404).json({ message: "Post not found or you don't have permission to edit it." });
    }
    const updatePost =` UPDATE Posts 
    SET title = $1, content = $2, image = $3, category = $4
    WHERE post_id = $5 RETURNING post_id`
    const updatePostResponse = await client.query(updatePost,[title,description,image,category,blogId])
    console.log(updatePostResponse)
    if(updatePostResponse.rows.length){
        res.json({
            message:"Update successfull"
        })
    }
})
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

// get recent posts
router.get('/getRecentPosts',authMiddleware,async function(req,res){
        const userId = req.user
        const getRecentPosts = `SELECT * from posts  where user_id<>$1 ORDER BY created_at DESC LIMIT 4`
        const getRecentPostsResponse = await client.query(getRecentPosts,[userId])
        res.json({
            recentBlogs:getRecentPostsResponse.rows
        })
})

router.get('/getBlogs',authMiddleware,async function(req,res){
    const {category} = req.query
    console.log(category)
    const blogByCategory = await client.query(`SELECT * from posts where category=$1`,[category])
    res.json({
        blogs:blogByCategory.rows
    })
})

router.get('/search',authMiddleware,async function(req,res){
    const {authorOrTitle} = req.query
    const blobByCategory = await client.query( `
                                                SELECT * 
                                                FROM posts
                                                WHERE category = $1 
                                                OR title = $1
                                                OR user_id = (SELECT user_id 
                                                FROM users
                                                WHERE username = $1);`,[authorOrTitle])  
    res.json({
        blogs:blobByCategory.rows
    })
})

router.get('/getSingleBlog',async function(req,res){
    const {blogId}= req.query
    console.log(blogId)
    const response = await client.query(`
     SELECT *,
     (select username from users where user_id=(select user_id from posts where post_id=$1))
     from posts where post_id=$1`,[blogId])

    res.json({
        blog:response.rows[0]
    })
})

router.get('/getUserBlogs',authMiddleware,async function(req,res){
    const userId = req.user
    const response = await client.query(
        `
        SELECT * from posts WHERE user_id=$1
        `,[userId]
    )
    res.json({
        blogs:response.rows
    })
})

router.delete('/deletePost/:postId',authMiddleware,async function(req,res){
    const postId = req.params.postId;
    const userId = req.user;

        const post = await client.query(
            `SELECT * FROM posts WHERE post_id=$1 AND user_id=$2`,
            [postId, userId]
        );

        if (post.rows.length === 0) {
            return res.status(404).json({ message: "Post not found or you don't have permission to delete it." });
        }
        const imagePath = path.join(__dirname, '../images/', post.rows[0].image);
        console.log('image path : '+imagePath)
        if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        }
        // Delete the post
        await client.query(`
             DELETE from upvotes WHERE blog_id=$1
            `,[postId])
        await client.query(
            `DELETE FROM posts WHERE post_id=$1`,
            [postId]
        );

        res.json({ message: "Post deleted successfully." });
})

module.exports = router;
