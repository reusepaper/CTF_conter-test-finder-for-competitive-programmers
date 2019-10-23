var express = require('express');
var dbConObj = require('../conf/db_info');
var dbconn = dbConObj.init();
var router = express.Router();
var  mysql = require('mysql');


/**
 * @swagger
 * tags:
 *   name: problem
 *   description: 문제 관리
 */

 /**
 * @swagger
 *  /source_code:
 *    post:
 *      tags:
 *      - problem
 *      description: 문제 추가. 문제 추가 후 문제 소스코드 추가해야함.
 *      responses:
 *       200:
 *      parameters:
 *       - in: body
 *         name: problem_info
 *         required: true
 *         description: 문제 생성 정보 입력
 *         schema:
 *           type: object
 *           properties:
 *             website_type:
 *               type: string
 *               description: baekjoon,jungol,swexpert 등
 *             problem_number:
 *               type: string
 *               description: 문제 번호 
 */
//문제 추가
router.post('/', function(req, res, next) {
  var problemObj = {
    website_type:req.body.website_type,
    problem_number:req.body.problem_number
  };

  //console.log(codeObj);
  var sql = "INSERT INTO problem SET ? "

  dbconn.query(sql, problemObj, function(err){
    if(err){
      console.error(err);
      res.send({ msg: "예기치 않은 오류가 발생하여 문제 생성에 실패하였습니다.",error:err});
      throw err;
    }
    res.send(200);
    //res.json(results)
  });
});
/**
 * @swagger
 *  /source_code:
 *    get:
 *      tags:
 *      - problem
 *      description: 문제 정보 호출
 *      responses:
 *       200:
 *      parameters:
 *       - in: query
 *         name: website_type
 *         description: baekjoon,jungol,swexpert등
 *       - in: query
 *         name: problem_number
 *         description: 문제 번호
 */
//문제 호출
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM problem where 1=1'; 
  var website_type=req.query.website_type;
  var problem_number=req.query.problem_number;
  if(problem_number!=undefined&&problem_number!=null&&problem_number!=""){
    sql=sql+' AND problem_number='+mysql.escape(problem_number);
  }
  if(website_type!=undefined&&website_type!=null&&website_type!=""){
    sql=sql+' AND website_type='+mysql.escape(website_type);
  }
  console.log(sql);
	dbconn.query(sql, function(err, results, field){
		if(err){
			console.error(err);
			res.send({msg: "예기치 않은 오류가 발생하여 문제 호출에 실패하였습니다.",error:err});
			throw err;
		}
		res.json(results)
		console.log(results);
	}); 
});
/**
 * @swagger
 *  /source_code/{problem_id}:
 *    put:
 *      tags:
 *      - problem
 *      description: 문제 정보 변경 *필요하면 수정하겠습니다..
 *      responses:
 *       200:
 *      parameters:
 *       - in: body
 *         name: problem_info
 *         description: 문제 정보
 *         schema:
 *           type: object
 *           properties:
 *             website_type:
 *               type: string
 *               description: baekjoon,jungol,swexpert 등
 *             problem_number:
 *               type: string
 *               description: 문제 번호 
 *       - in: path
 *         name: problem_id
 *         type: string
 *         description: 문제 아이디
 */
//문제 변경//수정시 다중 쿼리문으로
router.put('/:problem_id', function(req, res, next) {
  var item = [
    req.body.website_type,
    req.body.problem_number,
    req.params.problem_id
  ];

  var sql = "UPDATE problem SET website_type = ?, problem_number = ? WHERE problem_id=?" ;
  sql = mysql.format(sql, item);
  dbconn.query(sql,function(err){
    if(err){
      console.error(err);
      res.send({ msg: "예기치 않은 오류가 발생하여 문제 생성에 실패하였습니다.",error:err});
      throw err;
    }
    res.send(200);
    //res.json(results)
  });
});
/**
 * @swagger
 * tags:
 *   name: problem/answer
 *   description: 정답 소스 관리
 */
 /**
 * @swagger
 *  /source_code/answer:
 *    post:
 *      tags:
 *      - problem/answer
 *      description: 정답 소스코드 입력. 문제 아이디(problem_id) 필요
 *      responses:
 *       200:
 *      parameters:
 *       - in: body
 *         name: answer_info
 *         required: true
 *         description: 정답코드 정보
 *         schema:
 *           type: object
 *           properties:
 *             source_code:
 *               type: string
 *               description: 정답소스 코드
 *             problem_id:
 *               type: string
 *               description: 문제 아이디
 *             language_type:
 *               type: string
 *               description: 언어 타입(java,c++,c등등)) 
 */
//정답 소스 생성//문제 아이디 말고 문제 번호랑 웹사이트 가져와서 조인!
router.post('/answer', function(req, res, next) {
  var codeObj = {
    source_code:req.body.source_code,
    problem_id:req.body.problem_id,
    language_type:req.body.language_type
  };

  console.log(codeObj);
  var sql = "INSERT INTO answer_code SET ? "

  dbconn.query(sql, codeObj, function(err){
    if(err){
      console.error(err);
      res.send({ msg: "예기치 않은 오류가 발생하여 정답 코드 생성에 실패하였습니다.",error:err});
      throw err;
      
    }
    res.send(200);
    //res.json(results)
  });
});
 /**
 * @swagger
 *  /source_code/answer/{answer_code_id}:
 *    put:
 *      tags:
 *      - problem/answer
 *      description: 정답 소스코드 수정.
 *      responses:
 *       200:
 *      parameters:
 *       - in: path
 *         name: answer_code_id
 *         required: true
 *         description: 정답코드 아이디
 *         type: string
 *       - in: body
 *         name: answer_info
 *         required: true
 *         description: 정답코드 정보
 *         schema:
 *           type: object
 *           properties:
 *             source_code:
 *               type: string
 *               description: 정답소스 코드
 *             language_type:
 *               type: string
 *               description: 언어 타입(java,c++,c등등)
 */
//정답 소스 변경//
router.put('/answer/:answer_code_id', function(req, res, next) {
  var item = [
		req.body.language_type,
    req.body.source_code,
    req.params.answer_code_id
	];
	  var sql = "UPDATE answer_code SET language_type = ?, source_code = ? WHERE answer_code_id=?" ;
	  sql = mysql.format(sql, item);
	  dbconn.query(sql, function(err){
		  if(err){
			  console.error(err);
			  res.send({msg: "예기치 않은 오류가 발생하여 정답 수정에 실패하였습니다.",error:err});
			  throw err;
      }
      res.send(200);
		  //res.json(results)
	  });
});
 /**
 * @swagger
 *  /source_code/answer/{answer_code_id}:
 *    delete:
 *      tags:
 *      - problem/answer
 *      description: 정답 소스코드 삭제.
 *      responses:
 *       200:
 *      parameters:
 *       - in: path
 *         name: answer_code_id
 *         required: true
 *         description: 정답코드 아이디
 *         type: string
 */
//정답 소스 삭제
router.delete('/answer/:answer_code_id', function(req, res, next) {
  var answer_code_id = req.params.answer_code_id;
	var sql = 'DELETE FROM answer_code WHERE answer_code_id = ?';
	dbconn.query(sql, answer_code_id, function(err, results, field){
		if(err){
			console.error(err);
			res.send({msg: "예기치 않은 오류가 발생하여 정답 삭제에 실패하였습니다.",error:err});
			throw err;
    }
    res.send(200);
	});
});
 /**
 * @swagger
 *  /source_code/answer:
 *    get:
 *      tags:
 *      - problem/answer
 *      description: 정답 소스코드 호출.
 *      responses:
 *       200:
 *      parameters:
 *       - in: query
 *         name: source_code
 *         description: 정답소스 코드
 *         type: string
 *       - in: query
 *         name: language_type
 *         description: 언어 타입(java,c++,c등등)
 *         type: string
 *       - in: query
 *         name: answer_code_id
 *         description: 정답소스 아이디
 *         type: string
 *       - in: query
 *         name: problem_id
 *         description: 문제 아이디
 *         type: string
 */
//정답 소스 호출
router.get('/answer', function(req, res, next) {
  var source_code=req.query.source_code;
  var language_type=req.query.language_type;
  var answer_code_id=req.query.answer_code_id;
  var problem_id=req.query.problem_id;
  var sql = 'SELECT * FROM answer_code where 1=1'; 
  if(source_code!=undefined&&source_code!=null&&source_code!=""){
    sql=sql+' AND source_code='+mysql.escape(source_code);
  }
  if(language_type!=undefined&&language_type!=null&&language_type!=""){
    sql=sql+' AND language_type='+mysql.escape(language_type);
  }
  if(answer_code_id!=undefined&&answer_code_id!=null&&answer_code_id!=""){
    sql=sql+' AND answer_code_id='+mysql.escape(answer_code_id);
  }
  if(problem_id!=undefined&&problem_id!=null&&problem_id!=""){
    sql=sql+' AND problem_id='+mysql.escape(problem_id);
  }
	console.log(sql);
	dbconn.query(sql, function(err, results, field){
		if(err){
			console.error(err);
			res.send({msg: "예기치 않은 오류가 발생하여 정답소스 호출에 실패하였습니다.",error:err});
			throw err;
		}
		res.json(results)
		console.log(results);
	});
});
//회원 소스 생성
router.post('/member', function(req, res, next) {
  var memberObj = {
    member_code_id:req.body.member_code_id,
    problem_id:req.body.problem_id,
    source_code:req.body.source_code,
    member_id:req.body.member_id,
  };
  //console.log(memberObj);
  var sql = "INSERT INTO member_code SET ? "

  dbconn.query(sql, memberObj, function(err){
    if(err){
      console.error(err);
      res.send({ msg: "예기치 않은 오류가 발생하여 회원코드 생성에 실패하였습니다.",error:err});
      throw err;
    }
    //res.json(results)
  });
});
//회원 소스 변경
router.put('/member', function(req, res, next) {
  var item = [
		req.body.problem_id,
		req.body.source_code,
		req.body.member_id,
		req.body.member_code_id
	];
	  var sql = "UPDATE member_code SET problem_id = ?, source_code = ?, member_id=? WHERE member_code_id=?" ;
	  sql = mysql.format(sql, item);
	  dbconn.query(sql, function(err){
		  if(err){
			  console.error(err);
			  res.send({resultCd:'E', msg: "예기치 않은 오류가 발생하여 회원 수정에 실패하였습니다."});
			  throw err;
		  }
		  //res.json(results)
	  });
});
//회원 소스 삭제
router.delete('/member/:member_code_id', function(req, res, next) {
  var member_code_id = req.query.member_code_id;
	var sql = 'DELETE FROM member_code WHERE member_code_id = ?';
	dbconn.query(sql, member_code_id, function(err, results, field){
		if(err){
			console.error(err);
			res.send({resultCd:'E', msg: "예기치 않은 오류가 발생하여 회원 삭제에 실패하였습니다."});
			throw err;
		}
	});
});
//회원 소스 호출
router.get('/member/:member_code_id', function(req, res, next) {
  var member_code_id=req.query.member_code_id;
  var problem_number=req.query.problem_number;
  var sql; 
  if(problem_number==undefined||problem_number==null||problem_number==""){
    var item = [member_code_id];
    sql= 'SELECT * FROM member_code where member_code_id=?';
    sql = mysql.format(sql, item);
  }else{
    var item = [member_code_id,problem_number];
    sql = 'SELECT * FROM member_code where member_code_id=? AND problem_number=?';
    sql = mysql.format(sql, item);
  }
	dbconn.query(sql, function(err, results, field){
		if(err){
			console.error(err);
			res.send({resultCd:'E', msg: "예기치 않은 오류가 발생하여 맴버 문제 호출에 실패하였습니다."});
			throw err;
		}
		res.json(results)
		console.log(results);
	}); 
});
//소스 유효성 확인
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
