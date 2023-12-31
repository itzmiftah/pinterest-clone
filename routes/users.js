const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://miftahulislam138:pinterest123@cluster0.cnjupri.mongodb.net/pinterest?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    
  },
  profileImage :{
    type: String,
  },


  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  dp: {
    type: String, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});


module.exports= mongoose.model('User', userSchema);

