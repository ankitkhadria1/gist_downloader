var request = require('request');
var _ = require('lodash');
var fs = require('fs');
var async = require('async');

exports.gistDownloader = function(username)
{
	callApi(username,function(error,result)
	{
		if(error)
		{
			console.log(error);
		}else{
			getFiles(result,function(error,result)
			{
				if(error)
					console.log(error);
				else
				{
					console.log(result);
				}
			})
		}
	})

}

function  callApi(username, callback) {
	var options = {
		method: 'GET',
		url: 'https://api.github.com/users/'+ username+'/gists',
		headers: {
			'content-type': 'application/json',
			'User-Agent':'ankitkhadria1'
		}

	};
	request(options, function(error, response, body) {
		callback(error, body);
	});
}

function getFiles(string,callback)
{
	
	var data = JSON.parse(string);
	var length = data.length;
	var arrValue=[];
	var arrKey=[];
	async.auto({
		get_raw_url:function(cb)
		{
			for(var i=0;i<length;i++)
			{
				(function(i)
				{
		// console.log(data[i].files);
		var temp = data[i].files;
		var k=0;
		_.forEach(temp,function(value,key)
		{
			k++;
			arrValue.push(value.raw_url);
			console.log(key);
			arrKey.push(key);
			console.log(".....")
			
		})
		if(i==length-1)
			cb(null);

	})(i);
}
},
writeFile:['get_raw_url',function(cb,result)
{
	console.log(".....write file");
	for(var i=0;i<arrKey.length;i++)
	{
		(function(i)
		{
			request(arrValue[i],function(error,response,body)
			{
				fs.writeFile(arrKey[i], body ,  function(err) {
					if (err) {
						return console.error(err);
					}
					console.log("Data written successfully!");
					console.log("Let's read newly written data");
					
				});
			})
			if(i==arrKey.length-1)
				cb(null);

		})(i);
	}

}]
},function(error,result)
{
	if(error)
		callback(error);
	else
		callback(null);
})

	

}