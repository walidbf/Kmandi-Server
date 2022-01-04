require('rootpath')();
const express = require('express');
const app = express();
const multer=require('multer')
const path= require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const model = require(path.join(__dirname,'/products/image.model'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require(path.join(__dirname,'/users/users.controller')));
app.use('/products', require(path.join(__dirname,'/products/product.controller')));
app.use('/category', require(path.join(__dirname,'/category/category.controller')));
app.use('/events', require(path.join(__dirname,'/events/event.controller')));
app.use('/reviews', require(path.join(__dirname,'/reviews/review.controller')));
app.use('/orders', require(path.join(__dirname,'/Orders/order.controller')));

// global error handler
app.use(errorHandler);

// start server
const port =process.env.PORT || 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

//Multer configuration

app.use('/uploads', express.static(__dirname +'/uploads'));
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      //cb(null, new Date().toISOString()+file.originalname)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix+ '-'+file.originalname)
    }
  })
   
  const upload = multer({ storage: storage })
  app.post('/upload', upload.single('myImage'), async(req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("hey error")
    }
      const imagepost= new model({
        image: file.path,
      })
      const savedimage= await imagepost.save()
      res.json(savedimage)
    
  })

  app.get('/image',async(req, res)=>{
   const image = await model.find()
   res.json(image)
   
  })
  


  

// const express= require('express');
// const User = require('./models/user');

// const app= express();
// const mongoose= require('mongoose');

// const port = 3000;

// mongoose.connect("mongodb+srv://walidos11:walid123@foodapp.gylcw.mongodb.net/FoodApp?retryWrites=true&w=majority",{ useNewUrlParser: true })
// .then(()=>console.log('db connnected'))
// .catch((err) => console.log(err))
// app.get('/', (req,res) => {
//     res.send("Food App Server");
// })

// app.listen(port, () => {
//     console.log("Server running at port " + port);
// })


// app.get('/signup', (req, res) => {
//     const user = new User({
//         fullName: 'walid',
//         password:'123456',
//         email: 'walid.benftima@esprit.tn',
//         number: 52329894
//     });

//     user.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err)=> console.log(err));
// })

// app.get('/all-users', (req, res) => {
//     User.find().then((result)=>{
//         res.send(result);
//     })
//     .catch((err) => console.log(err));
// })

// app.get('/user',(req, res)=>{
//     User.findById('618c6bc562b04ce523b0abc2')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => console.log(err));
// })

