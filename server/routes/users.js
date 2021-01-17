const {Router} = require('express')
const User = require('../models/user');
const Post = require('../models/post');
const path = require('path');
const router = Router();

router.post('/image/set', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {
        
        const filedata = req.file;

        const image = '/'+filedata.path.split(path.sep).join(path.posix.sep)

        res.json({success: 'Ваш аватар изменен!', image})

        await User.setImage(req.session.user._id, image);

        req.session.user.image = image;

        req.session.save(err => {
            if (err) {
                throw err
            }
        })

    }else{

      res.json(null)

    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/posts', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {

      const {userId} = req.body

      
      const posts = await Post.getUserPosts(userId)

      res.json({posts})
    }else{

      res.json({error: 'Вы не авторизированы!'})

    }

  } catch (e) {
    console.log(e)
  }
})



module.exports = router