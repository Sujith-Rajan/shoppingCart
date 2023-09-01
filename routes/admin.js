var express = require("express");
var router = express.Router();
var prdctInserts = require("../productsOperation/prdctInsert");

const { response } = require("../app");

/* GET users listing. */
router.get("/", function (req, res, next) {
    prdctInserts.getAllProducts().then((products) => {
        res.render("admin/adminShowProducts", { products, admin: true });
    });
});
// when admin click addproducts this redirect to addproduct page

router.get("/adminAddProducts", (req, res) => {
    res.render("admin/adminAddProducts");
});
//after admin add products forms(body) and image export prdct insert page

router.post("/adminAddProducts", (req, res) => {
    console.log(req.body);
    console.log(req.files.image);
    prdctInserts.addProduct(req.body, (id) => {
        let image = req.files.image;
        image.mv("./public/product-image/" + id + ".jpg", (err, done) => {
            if (!err) {
                res.render("/admin/adminAddProducts");
            } else {
                console.log("error");
            }
        });
    });
});

router.get("/delete-product/", (req, res) => {
    let prdctId = req.query.id;
    console.log(prdctId);
    prdctInserts.deleteProducts(prdctId).then((response) => {
        res.redirect("/admin/");
    });
}); 

router.get('/editProduct/:id',async (req,res)=>{
    let product = await prdctInserts.getProductDetails(req.params.id)
    console.log(product)
    res.render('./admin/editProduct',{product})
})

router.post("/editProduct/:id", (req, res) => {
  let insertId =req.params.id
  prdctInserts.UpdateProduct(req.params.id,req.body).then(()=>{
    
    res.redirect('/admin/')
    if(req.files.image){
      let image = req.files.image;
      image.mv("./public/product-image/" + insertId + ".jpg")
    }

  }) 
      
});
module.exports = router;
