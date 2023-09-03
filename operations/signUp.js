var db = require("../database/connectionDb");
var collection = require("../database/collections");
const bcrypt = require("bcrypt");
var objectId = require("mongodb").ObjectId;
const { response, query } = require("express");

module.exports = {
    registerUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10);

            db.get()
                .collection(collection.USER_COLLECTION)
                .insertOne(userData)
                .then((data) => {
                    userData._id = data.insertedId;
                    console.log(userData);
                    resolve(userData);
                });
        });
    },
    loginUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email });
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        console.log("true");
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log("false");
                        resolve({ status: false });
                    }
                });
            } else {
                console.log("failed");
                resolve({ status: false });
            }
        });
    },
    addToCart:(proId,userId)=>{
        let proObj={
            item:new objectId(proId),
            quantity:1
        }
        return new Promise(async(resolve, reject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user:new objectId(userId)})
            console.log(userCart)
            if(userCart){
                let proExist=userCart.products.findIndex(product=>product.item==proId)
                console.log(proExist)
                
                if(proExist!=-1){
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({user:new objectId(userId),'products.item':new objectId(proId)},
                    {
                        $inc:{'products.$.quantity':1}
                    }
                    ).then(()=>{
                        resolve()
                    })
                }else{
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({user:new objectId(userId)},
                    {
                        
                            $push:{products:proObj}
                        
                    }
                ).then((response)=>{
                    resolve()
                })
            }
            }else{
                let cartObj={
                    user:new objectId(userId),
                    products:[proObj]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })  
            }
        })
    },
    // getCartProducts: (userId) => {
    //     return new Promise(async (resolve, reject) => {
    //         let cartItems = await db
    //             .get()
    //             .collection(collection.CART_COLLECTION)
    //             .aggregate([
    //                 {
    //                     $match: { user: new objectId(userId) },
    //                 },
    //                 // {
    //                 //     $lookup: {
    //                 //         from: collection.PRODUCT_COLLECTION,
    //                 //         let: { productsItems: "$products" },
    //                 //         pipeline: [
    //                 //             {
    //                 //                 $match: {
    //                 //                     $expr: {
    //                 //                         $in: ["$_id", "$$productsItems"],
    //                 //                     },
    //                 //                 },
    //                 //             },
    //                 //         ],
    //                 //         as: "cartItems",
    //                 //     },
    //                 // },
    //                 {
    //                     $unwind:'$products'
    //                 },
    //                 // {
    //                 //     $project:{
    //                 //         item:'$products.item',
    //                 //         quantity:'$products.quantity'
    //                 //     }
    //                 // },
    //                 // {
    //                 //     $lookup:{
    //                 //         from:collection.PRODUCT_COLLECTION,
    //                 //         localfield:'item',
    //                 //         foriegnfield:'id',
    //                 //         as:'product'
    //                 //     }
    //                 // }
    //             ])
    //             .toArray();
    //         console.log(cartItems[0].products);
    //         resolve(cartItems[0].cartItems);
    //     });
    // },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0;
            let cart = await db
                .get()
                .collection(collection.CART_COLLECTION)
                .findOne({ user: new objectId(userId) });
            if (cart) {
                count = cart.products.length;
            }
            resolve(count);
        });
    },
};
