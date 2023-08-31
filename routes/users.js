var express = require("express");
var router = express.Router();
var prdctInserts = require("../productsOperation/prdctInsert");
var signUps = require("../operations/signUp");



/* GET home page. */
router.get("/", function (req, res, next) {
    prdctInserts.getAllProducts().then((products) => {
      // console.log(products)
        res.render("user/userView", { products });
    });
});
// ----------------------------------------------------------------------------------
router.get("/userLogin", (req, res) => {
    res.render("user/userLogin");
});

router.get("/signUp", (req, res) => {
    res.render("user/userSignUp");
});

router.post("/signUp", (req, res) => {
    signUps.registerUser(req.body).then((response) => {
        console.log(response);
      //   req.session.loggedIn=true
      // req.session.user=response
      res.redirect('/')
    });
});

module.exports = router;
