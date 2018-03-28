var express = require('express');
var router = express.Router();
const question = require('../model/questions');

module.exports = {
  
  //show all question in list 
  find:(req,res)=>{
    question.find()
      .populate('UserId')
      .then(questions=>{
        res.status(201).json({
          message : 'succes show questions',
          data    : questions
        })
      })
      .catch(err=>{
        res.status(401).json({
          message : `erorr show question ${err}`,
          data: {}
        })
      })
  },
  //show one question search by id question
  findById : (req,res)=>{
    let id = req.params.id
    question.findById(id)
      .populate('UserId')
      .then(questions=>{
        res.json({
          data : questions
        })
      })
      .catch(err=>{
        message : `erorr show question ${err}`
        data : {}
      })
  },
  //create question 
  create:(req,res)=>{
    question.create({
      title:req.body.title,
      question:req.body.question,
      UserId:req.body._id
    })
    .then(questions=>{
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  update:(req,res,next)=>{
    question.findByIdAndUpdate(req.params.id,{
      title:req.body.title,
      question:req.body.question,
      UserId:req.decoded._id,
      CategoryId:req.body.CategoryId
    })
    .then(questions=>{
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  plusPoint:(req,res,next)=>{
    let id = req.params._id
    question.findById(req.params.id)
    .then(questions=>{
      if(questions.point){
        questions.point.push(req.body.point)
      }else{
        questions.point = req.body.point
      }
      questions.save()
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  minusPoint:(req,res,next)=>{
    question.findById(req.params.id)
    .then(questions=>{
      questions.point=questions.point.filter(e=>{
        return String(e) !== (req.body.point)
      })
      questions.save()
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    let id = req.params._id
    question.findByIdAndRemove(req.params.id)
    .then(questions=>{
      res.json(questions)
    })
    .catch(err=>{
      next(err)
    })
  },
}