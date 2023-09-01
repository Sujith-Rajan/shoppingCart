var express = require('express');
var router = express.Router();
var prdctInserts = require('../productsOperation/prdctInsert')

const { response } = require('../app');

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
router.get('/delete-product/',(req,res)=>{
  let prdctId= req.query.id
  console.log(prdctId)
  prdctInserts.deleteProducts(prdctId).then((response) =>{
    res.redirect('/admin/')

  })

})
// router.get('edit-product',(req,res)=>{

// })
module.exports = router;
