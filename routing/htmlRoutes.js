
var path = require('path');
// select the path the user hits based on their info in url line
module.exports = function(app){
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname, "/../public/survey.html"))
	});
	app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
  });
};