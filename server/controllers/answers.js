const answer = require('../model/answers')
var kue = require('kue')
  ,queue = kue.createQueue();

module.exports = {
  //show answer from question Id
  findByQuestion : (req,res,next)=>{
    answer
    .find({
      questionId:req.params.id
    })
    .populate(['userId'])
      .then(answers=>{
        res.status(201).send({
          data:answers
        })
      })
      .catch(err=>{
        next(err)
      })
  },
  //create answer
  create:(req,res)=>{
    answer.create({
      answer: req.body.answer,
      userId: req.body.userId,
      questionId: req.body.questionId,
    })
    .then(answers=>{
      answer.findOne(answer)
      .populate(['userId','questionId'])
      .then(data=>{
        console.log(data)
        queue.create('email',{
          email:data.userId.email,
          text: `Anda mendapatkan Jawaban baru untuk pertanyaan ${data.questionId.question}`,
          subject: 'hacktiv-over flow',
          html: `<p>Anda mendapatkan Jawaban baru untuk pertanyaan: ${data.questionId.question}<p><br>
          Please check in : <a href="">Hacktiv overflow </a>`
        }).save(err=>{
          if(err){
            res.status(401).json({
              message : 'errorr'
            })
          }else{
            res.status(201).send({
              data: answers
            })
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  //update answer
  update:(req,res,next)=>{
    answer.findByIdAndUpdate(req.params.id,{
        answer: req.body.answer,
        UserId: req.decoded._id,
        QuestionId: req.body.QuestionId,
    })
    .then(answers=>{
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
  //upvote answer
  plusPoint:(req,res,next)=>{
    answer.findById(req.params.id)
    .then(answers=>{
      if(!answers.point){
        answers.point = req.body.point
      }else{
        answers.point.push(req.body.point)
        
      }
      answers.save()
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
  //downvute answer
  minusPoint:(req,res,next)=>{
    answer.findById(req.params.id)
    .then(answers=>{
      answers.point=answers.point.filter(e=>{
        return String(e) !== (req.body.point)
      })
      answers.save()
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
  //eraser answer
  destroy:(req,res,next)=>{
    answer.findByIdAndRemove(req.params.id)
    .then(answers=>{
      res.json(answers)
    })
    .catch(err=>{
      next(err)
    })
  },
}