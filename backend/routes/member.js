var express = require('express');
var dbConObj = require('../conf/db_info');
var dbconn = dbConObj.init();
var router = express.Router();


//get 방식의 경우 req.query.id
/* GET users listing. */
router.post('/create', function(req, res, next) {
	var memberObj = {
			  id:req.body.id,
			  password:req.body.password,
			  name:req.body.name,
			  address:req.body.address,
			  phone_num:req.body.phone_num,
			  email:req.body.email,
			  nickname:req.body.nickname,
			  member_type:req.body.member_type
			};

			console.log(memberObj);
			var sql = "INSERT INTO member SET ? "

			dbconn.query(sql, memberObj, function(err, result){
				console.log(err);
			});
			
});
router.get('/update', function(req, res, next) {
	  res.send('respond with a resource');
});
router.get('/delete', function(req, res, next) {
	  res.send('respond with a resource');
});
router.get('/getMemberById', function(req, res, next) {
	  res.send('respond with a resource');
});
router.get('/getAllMember', function(req, res, next) {
	var sql = 'SELECT * FROM member'; // 클럽목록
	
	dbconn.query(sql, function(err, results, field){
		console.log(dbConObj);
		///res.render('club/clubList', {data : 'testData list ejs', clubList : results});
		if(err){
			console.error(err);
			res.send({resultCd:'E', msg: "예기치 않은 오류가 발생하여 대회 생성에 실패하였습니다."});
			throw err;
		}
		//res.send('respond with a resource');
		res.json(results)
		console.log(results);
	}); 
	console.log("ㅎㅇ!!");
	  
});

module.exports = router;
