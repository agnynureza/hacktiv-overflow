const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
    answer: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    questionId : {
      type: Schema.Types.ObjectId,
      ref: 'question'
    },
    point: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },{
    timestamps: true
  });
  
module.exports = mongoose.model('answer', answerSchema);