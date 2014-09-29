var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/getMessages', function(req,res){
	var db = req.db
	db.collection('messages').find().toArray(function(err,items){
		res.json(items);
	})
})

router.post('/addMessage', function(req,res){
	var db = req.db;
	db.collection('messages').insert(req.body, function(err,result){
		res.send(
			(err === null ? ({msg:'success'}):({msg:err}))
			)

	})
})

module.exports = router;
