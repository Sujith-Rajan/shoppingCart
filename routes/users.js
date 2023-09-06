var express = require("express");
var router = express.Router();
var prdctInserts = require("../productsOperation/prdctInsert");
var signUps = require("../operations/signUp");
const verifyLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/userLogin");
    }
};

/* GET home page. */
router.get("/",async function (req, res, next) {
    let user = req.session.user;
    let cartCount = null;
    if (req.session.user) {
        cartCount =await signUps.getCartCount(req.session.user._id);
    }

    prdctInserts.getAllProducts().then((products) => {
        // console.log(products)
        res.render("user/userView", { products, user, cartCount });
    });
});
// ----------------------------------------------------------------------------------
router.get("/userLogin", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        res.render("user/userLogin", { logginErr: req.session.logginErr });
        req.session.logginErr = false;
    }
});

router.get("/signUp", (req, res) => {
    res.render("user/userSignUp");
});

router.post("/signUp", (req, res) => {
    signUps.registerUser(req.body).then((response) => {
        console.log(response);
        req.session.loggedIn = true;
        req.session.user = response;
        res.redirect("/");
    });
});

router.post("/userLogin", (req, res) => {
    signUps.loginUser(req.body).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = response.user;
            res.redirect("/");
        } else {
            req.session.logginErr = "Invalid user name and password";
            res.redirect("/userLogin");
        }
    });
});

router.get("/UserLogout", (req, res) => {
    req.session.destroy();
    res.redirect("/userLogin");
});

router.get("/cart", verifyLogin, async (req, res) => {
    let cartProducts = await signUps.getCartProducts(req.session.user._id);
    let cartTotal =await signUps.getTotalAmount(req.session.user._id)
    res.render("user/cart", { cartProducts, user: req.session.user,cartTotal });
});

router.get('/add-to-cart/:id',(req, res)=>{
  console.log("api call")
   signUps.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
   })
})
router.post('/change-product-quantity',(req,res,next)=>{
    signUps.changeProductQuantity(req.body).then(async(response)=>{
        response.totalAmt = await signUps.getTotalAmount(req.body.user)
        res.json(response)
        
        // console.log(totalAmt)

    })
})
router.post('/remove-item/', (req, res,next) => {
  
   
    signUps.removeItem(req.body).then((response) => {
        res.json(response)
        console.log(response)



        
    })
    
}); 
router.get('/place-order',verifyLogin,async (req,res)=>{
    let totalAmt= await signUps.getTotalAmount(req.session.user._id)
    res.render('user/place-order',{totalAmt,user:req.session.user})
})
router.post('/place-order',(req,res)=>{
    console.log(req.body)
})
module.exports = router;
