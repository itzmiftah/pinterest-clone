const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  
  image:{
    type: String
  },

  user : {
     type : mongoose.Schema.Types.ObjectId,
     ref : "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Post', postSchema);
 