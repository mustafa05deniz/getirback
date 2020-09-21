



const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  }; 
mongoose.connect(mongoDB,options).then(response=>{
    console.log("connection true");
}).catch(err=>{
    console.log("connection error",err)
});
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
module.exports = mongoose;