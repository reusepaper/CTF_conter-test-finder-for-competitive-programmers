var  mysql = require('mysql');
var os = require('os');  //호스트 이름을 가져오기 위한 모듈

var dbconnInfo = {
	
	dev:{
		host: '52.78.48.222',
		port: '3306',
		user: 'root',
		password: 'ssafy',
		database: 'counter_test_finder', 
		multipleStatements : true
	}
	,
	//
//	real:{
//		host     : '1.1.1.1',
//		port: '1111',
//		user     : 'cafe24',
//		password : 'cafe24',
//		database : 'cafe24DB',
//		multipleStatements : true
//	}	
};

var dbconnection = {
	init : function(){
		//var hostname = os.hostname();
		return mysql.createConnection(dbconnInfo.dev);	//로컬개발환경
	},
	
	dbopen : function(con){
		con.connect(function(err){
			if(err){
				console.error("mysql connection error : " + err);
			}else{
				console.info("mysql connection successfully.");
			}
		});
	}
};


module.exports = dbconnection;