const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')



router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const error = {};
        let success = false;

        const candidate = await User.findOne({email})

        if(!candidate){
            Object.assign(error, {email: 'Данный Email не зарегистрирован!'});
        }

        if(candidate){

            const areSame = await bcrypt.compare(password, candidate.password)

            if (!areSame) {
                Object.assign(error, {password: 'Пароль не верен!'});
            }
            
        }

    
        if (!Object.keys(error).length) {
            req.session.user = candidate
            req.session.isAuthenticated = true
            req.session.save(err => {
                if (err) {
                    throw err
                }
            })

            success = {
                success: 'Вы успешно авторизованы!', 
                user: {
                    ...req.session.user._doc,
                    session_id: req.sessionID
                }
            };

            res.json(success)
        }else{
            res.json({error})
        }

    } catch (e) {
        console.log(e)
    }
    
    
})

router.post('/check', async (req, res) => {
    try {

    
        if (req.session.isAuthenticated) {

            const {followers, subs, _id, email, image, nickname} = req.session.user
            const user = {
                followers,
                subs,
                _id,
                email,
                image,
                nickname
            }
            res.json({user})
        }else{
            res.json(null)
        }
        
    } catch (e) {
        console.log(e)
    }
    
})

router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.json(null)

})

router.post('/register', async (req, res) => {
    try {
        const {nickname, email, password, repeat} = req.body

        const error = {};
        let success = false;

        if (!email) {
            Object.assign(error, {email: 'Вы не ввели Email!'});
        }

        if (!nickname) {
            Object.assign(error, {nickname: 'Вы не ввели никнейм!'});
        }

        if (!error.length) {
            const candidate = await User.findOne({ $or:[ {'email':email}, {'nickname': nickname} ]})
            
            if (!!candidate) {
                if(candidate['email'] === email){
                    Object.assign(error, {email: 'Данный Email уже существует!'});
                }
    
                if(candidate['nickname'] === nickname){
                    Object.assign(error, {nickname: 'Данный ник уже существует!'});
                }
            }
  
        }

        if (password !== repeat) {
            Object.assign(error, {password: 'Пароли не совпадают!'});
        }

        if (!Object.keys(error).length) {
            const hashPsw = await bcrypt.hash(password, 10)
            const user = new User({
                email, nickname, password: hashPsw, image: '', followers: [], subs: []
            })
            await user.save()

            success = {success: 'Вы успешно зарегистрировались!'};

            res.json(success)
        }else{
            res.json({error})
        }
           

        
  
    } catch (error) {
        console.log(error)
    }
  })

module.exports = router