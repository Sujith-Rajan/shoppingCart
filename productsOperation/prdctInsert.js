var db =require('../database/connectionDb')
var collection = require('../database/collections')
var objectId=require('mongodb').ObjectId
const { response } = require('../app')
module.exports ={
//-------------------------------------------
    addProduct:(product,callback)=>{

        

        // db.get().collection('product').insertOne(product,(err,data)=>{
        //     if(err)
        //      throw err;
        //     callback(data.insertedId);
        // })
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            console.log(data)
            
            callback(data.insertedId.toString())
        })
    
    },
 //-------------------------------------------
    getAllProducts:()=>{
        return new Promise (async (resolve,reject) =>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION ).find().toArray()
            resolve(products)
        })
    },
 //-------------------------------------------   
    deleteProducts:(prdctId) =>{
          return new Promise ( (resolve,reject) =>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:new objectId(prdctId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
          })
    },
  //Edit product ---first get product details
  getProductDetails:(editId) =>{
    return new Promise ((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:new objectId(editId)}).then((product)=>{
            console.log(product)
            resolve(product)
        })
    })
  },
  // after edit and submit this will work
  UpdateProduct:(updateId,bodyContent) =>{
    return new Promise ((resolve,reject) =>{
        db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:new objectId(updateId)},
        {$set:{
            item:bodyContent.item,
            price:bodyContent.price,
            quantity:bodyContent.quantity

        }}).then((response)=>{
              resolve()
        })
    })
  }

} 