var db =require('../database/connectionDb')
var collection = require('../database/collections')
module.exports ={

    addProduct:(product,callback)=>{

        

        
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            console.log(data)
            
            callback(data.insertedId.toString())
        })
    
    },
    getAllProducts:()=>{
        return new Promise (async (resolve,reject) =>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION ).find().toArray()
            resolve(products)
        })
    }
}