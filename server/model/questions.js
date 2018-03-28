const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: String,
    question: String,
    UserId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    point: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },{
    timestamps: true
  });
  
module.exports = mongoose.model('question', questionSchema);