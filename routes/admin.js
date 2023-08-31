var express = require('express');
var router = express.Router();
var prdctInserts = require('../productsOperation/prdctInsert')

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  prdctInserts.getAllProducts().then((products )=>{

    res.render('admin/adminShowProducts', { products,admin:true});

  })
  
});

router.get('/adminAddProducts',(req,res) =>{
  res.render('admin/adminAddProducts',{admin:true})
})

router.post('/adminAddProducts',(req,res)=>{

  console.log(req.body);
    console.log(req.files.image); 
  prdctInserts.addProduct(req.body,(id)=>{
    let image =req.files.image
    image.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/adminAddProducts')
      }
    })
    
    
   });
})

module.exports = router;