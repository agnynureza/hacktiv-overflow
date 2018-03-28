var express = require('express');
var router = express.Router();
const {findByQuestion,create,update,plusPoint,minusPoint,destroy} = require('../controllers/answers')

router.get('/find/:id',findByQuestion)
router.post('/create',create)
router.put('/update',update)
router.post('/upvote',plusPoint)
router.post('/downvote',minusPoint)
router.delete('/delete',destroy)



module.exports = router;
