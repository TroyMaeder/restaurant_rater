// function weatherApp(coordinates) {
// 	var https = require('https');
// 	var request = https.get('https://api.forecast.io/forecast/73430f139879e46bd6a8e95f20306f78/' + coordinates, function(response) {
// 		var body = '';
// 		response.on('data', function(chunk) {
// 			body += chunk;
// 		});
// 		response.on('end', function() {
// 			var data = JSON.parse(body);
// 			console.log(data.hourly.summary);
// 		 });
// 	});
//
// 	request.on('error', function(error) {
// 			console.log('Got error: ' + error.message);
// 	});
// }
// weatherApp('51.5712,0.1491');
