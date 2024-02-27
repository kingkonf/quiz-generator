const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
//   quizData: [{
//     questionId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Question'
//     },
//     selectedOption: Number // Index of the selected option
//   }],
  resultstatus: {
    type: String
  },
  percentage:{
    type: String
  },
  resulttype:{
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
