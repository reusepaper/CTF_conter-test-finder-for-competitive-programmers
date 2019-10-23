var express = require('express');
var dbConObj = require('../conf/db_info');
var dbconn = dbConObj.init();
var router = express.Router();
var  mysql = require('mysql');

//get 방식의 경우 req.query.id
/* GET users listing. */
/**
 * @swagger
 * tags:
 *   name: member
 *   description: 회원 정보 관리
 */

/**
 * @swagger
 *  /member:
 *    post:
 *      tags:
 *      - member
 *      description: 회원 가입
 *      responses:
 *       200:
 *      parameters:
 *       - in: body
 *         name: member_info
 *         description: user_info
 *         schema:
 *           type: object
 *           properties:
 *             member_id:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             phone_num:
 *               type: string
 *             email:
 *               type: string
 *             nickname:
 *               type: string
 */
router.post('/', function(req, res, next) {
	var memberObj = {
			  member_id:req.body.member_id,
			  password:req.body.password,
			  name:req.body.name,
			  phone_num:req.body.phone_num,
			  email:req.body.email,
			  nickname:req.body.nickname
			  //,member_type:req.body.member_type
			};

			//console.log(memberObj);
			var sql = "INSERT INTO member SET ? "

			dbconn.query(sql, memberObj, function(err){
				if(err){
					console.error(err);
					res.send({ msg: "예기치 않은 오류가 발생하여 회원생성에 실패하였습니다.",error:err});
					throw err;
				}
				res.send(200)
				//res.json(results)
			});
			
});
/**
 * @swagger
 *  /member:
 *    put:
 *      tags:
 *      - member
 *      description: 회원 정보 수정
 *      responses:
 *       200:
 *      parameters:
 *       - in: body
 *         name: member_info
 *         description: user_info
 *         schema:
 *           type: object
 *           properties:
 *             member_id:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             phone_num:
 *               type: string
 *             email:
 *               type: string
 *             nickname:
 *               type: string
 */
router.put('/', function(req, res, next) {
	  //맴버 타입은 제외
	  var item = [
		req.body.password,
		req.body.name,
		req.body.phone_num,
		req.body.email,
		req.body.nickname,
		req.body.member_id
	];
	  var sql = "UPDATE member SET password = ?, name = ?, phone_num=?, email = ?,nickname=? WHERE member_id=?" ;
	  sql = mysql.format(sql, item);
	  dbconn.query(sql, function(err){
		  if(err){
			  console.error(err);
			  res.send({ msg: "예기치 않은 오류가 발생하여 회원 수정에 실패하였습니다.",error:err});
			  throw err;
		  }
		  res.send(200)
		  //res.json(results)
	  });
});
/**
 * @swagger
 *  /member/{member_id}:
 *    delete:
 *      tags:
 *      - member
 *      description: 회원 정보 삭제
 *      responses:
 *       200:
 *      parameters:
 *       - in: path
 *         name: member_id
 *         type: string	
 *         description: 멤버 id
 */
router.delete('/:member_id', function(req, res, next) {
	var member_id = req.params.member_id;
	console.log({id:member_id});
	var sql = 'DELETE FROM member WHERE member_id = ?';
	dbconn.query(sql, member_id, function(err, results, field){
		if(err){
			console.error(err);
			res.send({ msg: "예기치 않은 오류가 발생하여 회원 삭제에 실패하였습니다.",error:err});
			throw err;
		}
		res.send(200);
	});
});
/**
 * @swagger
 *  /member/{member_id}:
 *    get:
 *      tags:
 *      - member
 *      description: 회원 아이디로 정보 호출
 *      responses:
 *       200:
 *      parameters:
 *       - in: path
 *         name: member_id
 *         type: string	
 *         description: 멤버 id
 */
router.get('/:member_id', function(req, res, next) {
	var member_id =req.params.member_id;
	//console.log(member_id);
	var sql = 'SELECT * FROM member where member_id= ?'; 
	dbconn.query(sql, member_id, function(err, results, field){
		if(err){
			console.error(err);
			res.send({ msg: "예기치 않은 오류가 발생하여 회원 조회에 실패하였습니다.",error:err});
			throw err;
		}
		res.json(results)
		console.log(results);
	});
});
/**
 * @swagger
 *  /member:
 *    get:
 *      tags:
 *      - member
 *      description: 전체 회원 정보 호출
 *      responses:
 *       200:
 */
router.get('/', function(req, res, next) {
	var sql = 'SELECT * FROM member'; 
	dbconn.query(sql, function(err, results, field){
		if(err){
			console.error(err);
			res.send({ msg: "예기치 않은 오류가 발생하여 회원 조회에 실패하였습니다.",error:err});
			throw err;
		}
		res.json(results)
		console.log(results);
	}); 
});

module.exports = router;
