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
   SELECT ps.*, COUNT(dv.blog_id) AS downvotes 
FROM posts ps
INNER JOIN downvotes dv ON ps.post_id = dv.blog_id
WHERE ps.user_id <> $1
GROUP BY ps.post_id, ps.content;
   `,[req.user])
   console.log(getResponse)
        
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

router.put('/upvote', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Assuming `req.user` contains authenticated user details
    const { blogId } = req.body; // Assuming `blogId` is sent in the request body

    if (!blogId) {
        return res.status(400).json({ error: 'Blog ID is required' });
    }

    try {
        // Check if the user has already upvoted this blog post
        const checkUpvoteQuery = 'SELECT * FROM upvotes WHERE user_id = $1 AND blog_id = $2';
        const checkUpvoteResult = await pool.query(checkUpvoteQuery, [userId, blogId]);

        if (checkUpvoteResult.rows.length > 0) {
            return res.status(400).json({ error: 'You have already upvoted this post' });
        }

        // Insert the upvote into the upvotes table
        const upvoteQuery = 'INSERT INTO upvotes (user_id, blog_id) VALUES ($1, $2)';
        await pool.query(upvoteQuery, [userId, blogId]);

        res.status(200).json({ message: 'Upvote recorded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while recording the upvote' });
    }
});

module.exports = router;
