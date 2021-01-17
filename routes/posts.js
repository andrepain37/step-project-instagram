const {Router} = require('express')
const Post = require('../models/post')
const path = require('path');
const Comment = require('../models/comment');
const User = require('../models/user');
const router = Router();




router.post('/create', async (req, res) => {
  try {

      if (req.session.isAuthenticated) {


        const filedata = req.file;
        const post = new Post({
          image: '/'+filedata.path.split(path.sep).join(path.posix.sep),
          userId: req.session.user._id
        })

        res.json({success: 'Ваш пост опубликован!'});

        await post.save()
        
      }else{
        res.json(null)
      }
      
  } catch (e) {
      console.log(e)
  }
  
})

router.post('/comment', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {

      const {comment, postId} = req.body
      

      if (!comment.trim()) {
        res.json({error: 'Комментарий не должен быть пустым!'})
      }

      const newComment = new Comment({
        comment,
        postId,
        userId: req.session.user._id
      })

      const id = newComment._id
     

      res.json({success: 'Ваш комментарий опубликован!', id});
      
      await newComment.save();
     
      
    }else{
      res.json({error: 'Вы не вошли в аккаунт!'})
    }
      
  } catch (e) {
      console.log(e)
  }
})

router.post('/comments', async (req, res) => {
  try {

    const {postId} = req.body

    if (!!postId) {

      const comments = await Comment.allWithUserInfo(postId)


      res.json({comments});
      
    }else{
      res.json(null)
    }
      
  } catch (e) {
      console.log(e)
  }
})

router.post('/like', async (req, res) => {
  try {

    if (!!req.session.user) {
      const {postId, isLike} = req.body
      
      const action = isLike ? '$push' : '$pull';

      const likedPost = await Post.findOneAndUpdate({_id: postId}, { [`${action}`]: { "likesUser": req.session.user._id } });

      
      await likedPost.save();
      res.json({success: 1})
    }else{
      res.json({error: 'Вы не зашли в аккаунт!'})
    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/', async (req, res) => {
  try {

    const {page} = req.body


    const posts = await Post.withLastComment(3, page);

    
    let json = [];

    if (!!posts.length) {
      for (let i = 0; i < posts.length; i++) {
        let lastComment = [];
        let liked = false;

        if (!!posts[i].lastComment[0]) {

          const {nickname} = await User.findById(posts[i].lastComment[0].userId);

          lastComment = [{
            id: posts[i].lastComment[0]._id + 1,
            name: nickname,
            comment: posts[i].lastComment[0].comment
          }]
        }

        if (!!req.session.user) {
          liked = posts[i].likesUser.map(user=>user.toString()).includes(req.session.user._id.toString())
        }

        const newO = {
          id: posts[i]._id,
          likes: posts[i].likesUser.length,
          image: req.generateUrl(posts[i].image),
          user: {
            nickname: posts[i].user[0].nickname,
            image: posts[i].user[0].image
          },
          liked,
          date: posts[i].date,
          lastComment
  
        }
        
        json.push(newO)
      }
    }else{
      json = false
    }

    

    res.json(json)

  } catch (e) {
    console.log(e)
  }
})

router.post('/one', async (req, res) => {
  try {

    const {postId} = req.body


    const post = await Post.oneWithCommentsByPostId(postId);

    let json = [];

    

    if (!!post) {
     
      const lastComments = [];
      let liked = false;

     
      if (!!post.comments.length) {
        for (let i = 0; i < post.comments.length; i++) {
          const {nickname} = await User.findById(post.comments[i].userId);

          lastComments.push({
            id: post.comments[i]._id,
            name: nickname,
            comment: post.comments[i].comment
          })
          
        }
        
      }

      
      if (!!req.session.user) {
        liked = post.likesUser.map(user=>user.toString()).includes(req.session.user._id.toString())
      }

      json = {
        id: post._id,
        likes: post.likesUser.length,
        image: req.generateUrl(post.image),
        user: {
          nickname: post.user[0].nickname,
          image: post.user[0].image
        },
        liked,
        date: post.date,
        lastComments
      }
      
    }else{
      json = false
    }

    

    res.json(json)

  } catch (e) {
    console.log(e)
  }
})

module.exports = router