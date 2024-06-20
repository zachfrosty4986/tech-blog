const router = require('express').Router();
const { Comment } = require('../../models');
const moment = require('moment') //date handler

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            user_id: req.session.user_id,
            content: req.body.content,
            blog_id: req.body.blog_id,
            date_posted: moment().format('MMMM Do YYYY, h:mm:ss a'), //example of appearance: "June 19th 2024, 9:31:37 am"
            likes: 0,
        });
        res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router