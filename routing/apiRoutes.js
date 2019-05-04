var bodyParser = require("body-parser");
var path = require("path");
var animalArray = require("../data/friends.js")




module.exports = function (app) {

	// allows express to use different data points
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.get("/api/friends", function (req, res) {
		return res.json(animalArray);
	});

	// when the api/run is queried
	app.post("/api/friends", function (req, res) {
		// save the user info as a variable
		var newUser = req.body;
		var userVal = 0;
		var compareValue = 52;
		var friendSuggestion = {};
// update the value for userVal
		for (var x = 0; x < newUser.scores.length; x++){
			userVal += parseInt(newUser.scores[x]);
			// let's update the values on the object array to numbers so we can use them later
			newUser.scores[x] = parseInt(newUser.scores[x])
		};
		// if the values come in blank from the user for name we assign it something
		if (newUser.name === ''){
			newUser.name = "Frank"
		} else {
			console.log("The user used the name field")};
			if (newUser.photo === ''){
				newUser.photo = "https://www.worldatlas.com/r/w728-h425-c728x425/upload/2e/5f/18/eurasian-eagle-owl.jpg"
			} else {
				console.log("The user used the PHOTO field")};

		console.log("newUser", newUser);
		// function that will allow us to return on a single line of code but still update values with 2 passed through variables
		function updateValues(bestMatch, bestMatchValue) {
			friendSuggestion = bestMatch;
			compareValue = bestMatchValue;
		};
		// add up the values in the answers from the newUser

		// for loop to run through the information from friends.js 
		for (var i = 0; i < animalArray.length; i++) {
			var mA = animalArray[i];
			console.log(mA);
			var mAScore = 0;
			// add all the values from the answers to the mAscore
			for (var j = 0; j < mA.scores.length; j++) {
				mAScore += mA.scores[j];
				console.log(mAScore);
			};
			// if the value in the iteration is smaller than the current value of compareValue, then update Compare Value and the closestName to be the data from the object in the iteration
			var difference = Math.abs(mAScore - userVal)
			if ( difference < compareValue){
				updateValues(mA, difference);
			} else {console.log("This wasn't the best match for you")}
			// else meh
		};
		// append the monsterMatchmaker Array with the information you just put in.
		animalArray.push(newUser);
// return some stuff:
res.json({name:friendSuggestion.name, photo: friendSuggestion.photo, score: difference });
	});


};