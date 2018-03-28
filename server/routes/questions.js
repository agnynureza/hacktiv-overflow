var express = require('express');
var router = express.Router();
const {find,findById,create,update,plusPoint,minusPoint,destroy} = require('../controllers/questions')

router.get('/find',find)
router.get('/findById/:id',findById)
router.post('/create',create)
router.put('/update',update)
router.post('/upvote',plusPoint)
router.post('/downvote',minusPoint)
router.delete('/delete',destroy)


module.exports = router;
