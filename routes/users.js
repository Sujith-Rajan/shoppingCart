var express = require("express");
var router = express.Router();
var prdctInserts = require("../productsOperation/prdctInsert");
var signUps = require("../operations/signUp");
const verifyLogin = (req,res,next) => {
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/userLogin')
  }

}


/* GET home page. */
router.get("/", function (req, res, next) {
    let user = req.session.user;
    prdctInserts.getAllProducts().then((products) => {
        // console.log(products)
        res.render("user/userView", { products, user });
    });
});
// ----------------------------------------------------------------------------------
router.get("/userLogin", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
    } else {
        res.render("user/userLogin",{"logginErr":req.session.logginErr});
        req.session.logginErr =false
    }
});

router.get("/signUp", (req, res) => {
    res.render("user/userSignUp");
});

router.post("/signUp", (req, res) => {
    signUps.registerUser(req.body).then((response) => {
        console.log(response);
          req.session.loggedIn=true
        req.session.user=response
        res.redirect('/')
    });
});

router.post("/userLogin", (req, res) => {
    signUps.loginUser(req.body).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = response.user;
            res.redirect("/");
        } else {
            req.session.logginErr = "Invalid user name and password"
            res.redirect("/userLogin");
        }
    });
});

router.get("/UserLogout", (req, res) => {
    req.session.destroy();
    res.redirect("/userLogin");
});

router.get('/cart',verifyLogin, (req,res) =>{
   
  res.render('user/cart')
  
})

router.get('/addToCart/:id',verifyLogin,(req,res)=>{
  signUps.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.redirect('/')
  })

})
module.exports = router;
