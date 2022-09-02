var express = require('express');
var router = express();
const mysql2 = require('mysql2');
var cors = require('cors')
const multer = require('multer');
// const bodyParser = require('body-parser')
// import image from '../../spin/src/images'

// router.use(cors())

//login constants
var users = [{
  email: 'reg1',
  password: 'reg2'
}]

var admin = [{
  email: 'admin1',
  password: 'admin1'
}]

//DB connection
const db = mysql2.createConnection({
  user: "admire",
  host: "localhost",
  password: "admire123",
  database: "employeeSys",
});

//
//Upload image
const stor = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/admire/Vs/REACT/D_workspace/reAcT/spin/src/images')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: stor })

router.use(express.static('../../spin/src/images'));
router.use('../../spin/images/images', express.static('images'));

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("Welcome Addy")

});

//Login route
router.post('/login', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  let result = users.find(user => user.email == req.body.email);
  let results = admin.find(adm => adm.email == req.body.email);

  if (result) {
    if (result.password == req.body.password) {
      res.status(200).send({
        message: 'Successful'
      })
    }
    else {
      res.status(200).send({
        message: 'User Password Incorect'
      })
    }
  }
  else if (results) {
    if (results.password == req.body.password) {
      res.status(200).send({
        message: 'Success'
      })
    }
    else {
      res.status(403).send({
        message: 'Admin Password incorrect'
      })
    }
  }
  else {
    res.status(404).send({
      message: 'User or Admin not found'
    })
  }
})

//
//Image update router
router.post('/profileUpload', upload.single('profile-upload'), function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(JSON.stringify(req.file))
  const profile_upload = req.file.filename;
  image = profile_upload;
  console.log(profile_upload)
  const sqlInsert = "INSERT INTO products (name,description, image) VALUES (?,?,?)"
  db.query(sqlInsert, ['Hp-Pro-Book', 'Super efficient Laptop', image], (err, result) => {
    if (err) throw err
    console.log('File uploaded')
  })
  var respose = '<a href="/">Home</a><br>'
  respose += "Files uploaded successfully.<br>"
  return res.send(respose)
})

//Get images from db
router.get('/images', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const sqlGetImages = "SELECT * FROM products"
  db.query(sqlGetImages, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      res.status(200).send({
        message: result
      })
    }
  })
})


//getAllProducts
router.get("/products", (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");

  const getProducts = "SELECT * FROM products"
  db.query(getProducts, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      res.status(200).send({
        message: result
      })
    }
  })
})

//getAllProductsByID
router.get("/products/:id", (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id =?", id, (err, result) => {

    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      res.status(200).send({
        message: result
      })
    }
  })


})

//Get Image by ID
router.get('/images/:id', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id =?", id, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      res.status(200).send({
        message: result
      })
    }
  })
})

//Update bid by id
router.get('/bid/:id', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id =?", id, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      db.query("UPDATE price TO products WHERE id=?", id, (err, result) => {
        if (err) {

        }
        else {
          res.status(200).send({
            message: result
          })
        }
      })

    }
  })
})

//create a bid
router.post('/bidding/create', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const product_id = req.body.id
  const amount = req.body.price
  console.log(req.body)
  console.log(amount)
  console.log(product_id)
  db.query("SELECT * FROM bidding WHERE product_id =?  ORDER BY bid_id DESC   LIMIT 1", product_id, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      console.log(amount)
      console.log(result[0].amount)
      if (amount > result[0].amount) {
        const sqlInsert = "INSERT INTO bidding (user,product_id, amount) VALUES (?,?,?)"
        db.query(sqlInsert, ['reg1', product_id, amount], (err, result) => {
          if (err) {
            console.log(err)
          }
          else {
            res.status(200).send({
              message: result
            })
          }
        })
      }
      else {
        res.status(201).send({
          message: 'You cant bid a smaller amount'
        })
      }

    }
  })

  const sqlInsert = "INSERT INTO bidding (user,product_id, amount) VALUES (?,?,?)"
  db.query(sqlInsert, ['reg1', 1, 700], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      res.status(200).send({
        message: result
      })
    }
  })

})

//getBids
router.get("/bidding/getAllBids", (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  db.query("SELECT * FROM bidding ", (err, result) => {

    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      res.status(200).send({
        message: result
      })
    }
  })


})

//Get Bidding by product_id
router.get("/bidding/:id", (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  db.query("SELECT * FROM bidding WHERE product_id =?  ORDER BY bid_id DESC   LIMIT 1", id, (err, result) => {

    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      res.status(200).send({
        message: result
      })
    }
  })


})

module.exports = router;



/**
 * 
 --products
  --getAll
  --gget//id
  {
  id, namee, price,  expiryDate, description
  } -> List

  ---biddings
  set biddding by ProductId
  [id, pproductId, userID, amouunt, timebidding]

  get bid by productId
  [id, prooductId, uuserIId, amount]


  -autoBid
    --user
    - product
    --max value
    -- value -1.
    --notification % of max__value

[uid, userID, productID, max_value, threshold]
  
  --users
  -addmin
  -normal
 */