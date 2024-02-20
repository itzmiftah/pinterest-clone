const dotenv = require("dotenv").config();
const mongoose = require("mongoose");


const connectDB = async () => {
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/pinteres`);
      console.log(`\n MONGODB Connected || DB Host ${connectionInstance.connection.host} `);
  
    } catch (error) {
      console.log("MONGODB Connection Failed", error);
      process.exit(1);
    }
  
   }
   module.exports = connectDB();