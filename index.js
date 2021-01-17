const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const exphbs = require('express-handlebars')
const MongoStore = require('connect-mongodb-session')(session)
const multer = require('multer')
const genCrypt = require('./modules/gen-crypt')

const MONGODB_URI = `mongodb+srv://adminandre:BO2yueuWVeDJhrdC@cluster0-b3knh.mongodb.net/step-project`;

const SESSION_HASH = 'c3RlcF9wcm9qZWN0X2Rhbl9pdA==';

const userRoutes = require('./routes/users')
const cardPosts = require('./routes/posts')
const subsRoutes = require('./routes/subs')
const authRoutes = require('./routes/auth')


const userMiddleware = require('./middleware/user')
const genUrl = require('./middleware/generateUrl')


const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views');




app.use(express.static(path.join(__dirname, '')))

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(session({
  secret: SESSION_HASH,
  resave: false,
  saveUninitialized: false,
  store
}))

const fileFilter = (req, file, cb) => {
  
  if(req.session.isAuthenticated){
      cb(null, true);
  }else{
      cb(null, false);
  }
}



const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "public/photos");
  },
  filename: (req, file, cb) =>{
      const ex = file.originalname.split('.');
      cb(null, Date.now() + genCrypt() + '.' + ex[ex.length - 1])
  }
});

app.use(multer({storage: storageConfig, fileFilter}).single("image_upload"));



app.use(userMiddleware)
app.use(genUrl)


app.use('/users', userRoutes)
app.use('/posts', cardPosts)
app.use('/subs', subsRoutes)
app.use('/auth', authRoutes)

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()


