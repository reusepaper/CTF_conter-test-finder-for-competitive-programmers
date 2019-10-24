var express = require('express');
var dbConObj = require('../conf/db_info');
let secretObj = require('../conf/jwt');
var jwt = require("jsonwebtoken");
var dbconn = dbConObj.init();
var router = express.Router();
var  mysql = require('mysql');
let crypto = require('crypto');
function getKey(pw){
	let salt = 'hello-ssafy',i = 10000,len = 16,digest = 'sha512';
	return crypto.pbkdf2Sync(pw, salt, i, len, digest).toString('hex');	
}
//get 방식의 경우 req.query.id
/* GET users listing. */
/**
 * @swagger
 * tags:
 *   name: login
 *   description: 로그인 정보관리
 */
/**
 * @swagger
 *  /member/login:
 *    post:
 *      tags:
 *      - login
 *      description: 로그인
 *      responses:
 *       200:
 *      parameters:
 *       - in: body
 *         name: member_info
 *         description: user_info
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             member_id:
 *               type: string
 *             password:
 *               type: string
 */
//로그인
router.post('/login', function(req, res, next) {
	var member_id=req.body.member_id;
	var password=getKey(req.body.password);
	
		//console.log(memberObj);
		var sql = "SELECT * FROM member where member_id=?"
		dbconn.query(sql, member_id, function(err,results){
			if(err){
				console.error(err);
				res.send({ msg: "예기치 않은 오류가 발생하여 로그인에 실패하였습니다."});
				throw err;
			}
		
			if(results==undefined||results==""||results==null||results[0]['password']!=password){
				res.send("아이디 또는 비밀번호가 잘못되었습니다.");
				res.send(401);
			}
			//로그인 성공
			let token = jwt.sign({
				member_id: results[0]['member_id'],
				member_type: results[0]['member_type']
			  },
			  secretObj.secret ,    // 비밀 키
			  {
				expiresIn: '5m'    // 유효 시간은 5분
			  })
			  res.cookie("member", token);
			  res.json({
				token: token
			})

			});
			
});
/**
 * @swagger
 *  /member/logout:
 *    post:
 *      tags:
 *      - login
 *      description: 로그아웃
 *      responses:
 *       200:
 */
//로그아웃
router.post('/logout', function(req, res, next) {
	res.clearCookie("member");
	res.send(200);
});

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
 *           required:
 *             -member_id
 *             -password
 *             -name
 *             -phone_num
 *             -email
 */
router.post('/', function(req, res, next) {
	let token = req.cookies.member;
	let decoded = jwt.verify(token, secretObj.secret);
	if(decoded){
		res.send("권한이 없습니다.")
	}
	var memberObj = {
			  member_id:req.body.member_id,
			  password:getKey(req.body.password),
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
					res.send({ msg: "예기치 않은 오류가 발생하여 회원생성에 실패하였습니다."});
					throw err;
				}
				res.send(200)
				//res.json(results)
			});
			
});
/**
 * @swagger
 *  /member/{member_id}:
 *    put:
 *      tags:
 *      - member
 *      description: 회원 정보 수정
 *      responses:
 *       200:
 *      parameters:
 *       - in: path
 *         name: member_id
 *         description: 멤버 아이디
 *         type: string
 *         required: true
 *       - in: body
 *         name: member_info
 *         description: user_info
 *         schema:
 *           type: object
 *           properties:
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
router.put('/:member_id', function(req, res, next) {
	  //맴버 타입은 제외
	  var item = [
		req.body.password,
		req.body.name,
		req.body.phone_num,
		req.body.email,
		req.body.nickname,
		req.params.member_id
	];
	  var sql = "UPDATE member SET password = ?, name = ?, phone_num=?, email = ?,nickname=? WHERE member_id=?" ;
	  sql = mysql.format(sql, item);
	  dbconn.query(sql, function(err){
		  if(err){
			  console.error(err);
			  res.send({ msg: "예기치 않은 오류가 발생하여 회원 수정에 실패하였습니다."});
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
 *         required: true
 */
router.delete('/:member_id', function(req, res, next) {
	var member_id = req.params.member_id;
	console.log({id:member_id});
	var sql = 'DELETE FROM member WHERE member_id = ?';
	dbconn.query(sql, member_id, function(err, results, field){
		if(err){
			console.error(err);
			res.send({ msg: "예기치 않은 오류가 발생하여 회원 삭제에 실패하였습니다."});
			throw err;
		}
		res.send(200);
	});
});
/**
 * @swagger
 *  /member:
 *    get:
 *      tags:
 *      - member
 *      description: 회원 아이디로 정보 호출
 *      responses:
 *       200:
 *      parameters:
 *       - in: query
 *         name: member_id
 *         type: string	
 *         description: 멤버 id
 *       - in: query
 *         name: name
 *         type: string	
 *         description: 멤버 이름
 *       - in: query
 *         name: password
 *         type: string	
 *         description: 비밀번호
 *       - in: query
 *         name: phone_num
 *         type: string	
 *         description: 핸드폰 번호
 *       - in: query
 *         name: email
 *         type: string	
 *         description: 이메일
 *       - in: query
 *         name: member_type
 *         type: string	
 *         description: 멤버타입
 *       - in: query
 *         name: nickname
 *         type: string	
 *         description: 멤버 닉네임
 */
router.get('/', function(req, res, next) {
	var member_id =req.query.member_id;
	var name =req.query.name;
	var password =req.query.password;
	var phone_num =req.query.phone_num;
	var email =req.query.email;
	var member_type =req.query.member_type;
	var nickname =req.query.nickname;
	
	//console.log(member_id);
	var sql = 'SELECT * FROM member where 1=1'; 
	if(member_id!=undefined&&member_id!=null&&member_id!=""){
		sql=sql+' AND member_id='+mysql.escape(member_id);
	}
	if(name!=undefined&&name!=null&&name!=""){
		sql=sql+' AND name='+mysql.escape(name);
	}		
	if(password!=undefined&&password!=null&&password!=""){
		sql=sql+' AND password='+mysql.escape(password);
	}		
	if(phone_num!=undefined&&phone_num!=null&&phone_num!=""){
		sql=sql+' AND phone_num='+mysql.escape(phone_num);
	}		
	if(email!=undefined&&email!=null&&email!=""){
		sql=sql+' AND email='+mysql.escape(email);
	}		
	if(member_type!=undefined&&member_type!=null&&member_type!=""){
		sql=sql+' AND member_type='+mysql.escape(member_type);
	}
	if(nickname!=undefined&&nickname!=null&&nickname!=""){
		sql=sql+' AND nickname='+mysql.escape(nickname);
	}
			
	dbconn.query(sql, function(err, results, field){
		if(err){
			console.error(err);
			res.send({ msg: "예기치 않은 오류가 발생하여 회원 조회에 실패하였습니다."});
			throw err;
		}
		res.json(results)
		
	});
});

module.exports = router;
