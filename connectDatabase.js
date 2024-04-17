

const mongoose = require('mongoose');

const connectDatabase = async () =>{
    
    const options = {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        serverSelectionTimeoutMS:10000,
        socketTimeoutMS:45000 
    }
  
    try{
        await mongoose.connect(process.env.CONNECT_MONGODB_LOCAL, options);
        console.log('Successfully connected to database');
    }
    catch (e){
        console.log('an error occurred while connecting to database', e);
    }
}

module.exports = connectDatabase