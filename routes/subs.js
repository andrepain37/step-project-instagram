const {Router} = require('express')
const User = require('../models/user');
const Post = require('../models/post');
const router = Router();

router.post('/recomends', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {
      
      const subs = await User.getRecomends(req.session.user._id);

      res.json({subs})
    }else{

      res.json(null)

    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/get', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {
      
      const subs = await User.getSubs(req.session.user._id);

      res.json({subs})
    }else{

      res.json(null)

    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/info', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {

      const {userId} = req.body
      
      const userInfo = await User.findById(userId).select({
        image: 1,
        nickname: 1
      });

      const isSub = await User.checkInMySubs(req.session.user._id, userId)

      const info = {
        ...userInfo._doc,
        isSub
      }

      res.json({info})
    }else{

      res.json({error: 'Вы не авторизированы!'})

    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/posts', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {

      const {userId} = req.body
      
      const posts = await Post.find({userId})
      .select({
        image: 1,
        likesUser: 1,
        nickname: 1,
        date: 1
      })
      .sort([['date', -1]])


      res.json({posts})
    }else{

      res.json({error: 'Вы не авторизированы!'})

    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/action/sub', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {

      const {userId} = req.body
      
      const sub = await User.setSub(userId, req.session.user._id);
      if (!sub) {
        res.json({error: 'Вы уже подписаны на этого пользователя!'})
      }else{
        res.json({sub: 1})
      }
     
    }else{

      res.json(null)

    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/action/unsub', async (req, res) => {
  try {

    if (req.session.isAuthenticated) {

      const {userId} = req.body
      
      const sub = await User.delSub(userId, req.session.user._id);
      if (!sub) {
        res.json({error: 'Вы не подписаны на этого пользователя!'})
      }else{
        res.json({sub: 1})
      }
     
    }else{

      res.json(null)

    }

  } catch (e) {
    console.log(e)
  }
})



module.exports = router