


const{MongoClient} = require('mongodb');

const state = {
    db:null
};

const url = "mongodb://127.0.0.1:27017";
const dbName = "shopping";

// create new mongodb client
const client = new MongoClient(url);

//mongodb connection estabalis function
const connect = async (data) =>{
    try{
        //connecting to mongodb
        await client.connect();
        // setting up database name to the connecting clinet
        const db= client.db(dbName);
        // setting up database name to the state
        state.db = db;
        //callback after connected
        return data();
    }catch(err){
        //callback when an error    occurs
        return data(err)
    }


    }
    //function to get the database instance 
    const get= ()=>state.db;

    //exporting function
    module.exports ={
        connect,
        get
    };
