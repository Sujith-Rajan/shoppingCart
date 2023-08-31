var db = require("../database/connectionDb");
var collection = require("../database/collections");
const bcrypt = require("bcrypt");
const { response } = require('express');


module.exports = {
    registerUser: (userData) => {
  
        return new Promise(async(resolve, reject) => {
    
          userData.Password =await bcrypt.hash(userData.Password, 10);
    
          
          db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => { 
           
            userData._id=data.insertedId
        console.log(userData);
        resolve(userData);
          
      })
    
        
    
        })
    
      },
      loginUser:(userData) => {
        return new Promise (async(resolve,reject)=>{
            let loginStatus = false;
            let response = {}
            let user =await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("true")
                        response.user = user
                        response.status = true
                        resolve(response)
                    }
                    else{
                        console.log("false")
                        resolve({status:false})
                    }

                })
            }
            else{
                console.log("failed")
                resolve({status:false})
            }

        })
      }
};
