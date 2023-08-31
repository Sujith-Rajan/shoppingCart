var db = require("../database/connectionDb");
var collection = require("../database/collections");
const bcrypt = require("bcrypt");
const { response } = require('express');
const objectId = require("mongodb").ObjectId;

module.exports = {
    registerUser: (userData) => {
  
        return new Promise(async(resolve, reject) => {
    
          userData.Password =await bcrypt.hash(userData.Password, 10);
    
          
          db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => { 
            //   db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(data.insertedId) }).then((userData) => {
            //   resolve(userData)
            userData._id=data.insertedId
        console.log(userData);
        resolve(userData);
          
      })
    
        
    
        })
    
      },
};
