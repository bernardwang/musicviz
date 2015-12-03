//
//	api.js
//	
//	RESTful api for music collection
//

var Genre = require('../models/Genre');	
var User = require('../models/User');

var api = function (app) {
	
	/**
	 *		GET - gets all genre data
	 */
	app.get('/api/music/genres', function(req, res) {
    console.log('GET GENRES');
		
		Genre
		.find({})
		.sort({ value: -1 })
		.limit(20)
		.exec(function(err, genres) {
    	if(err){
				console.log(err);
    	  res.json(null);
			}
    	res.json(genres); 
    });
	});
	
	/**
	 *		POST - add genre data
	 */
	app.post('/api/music/genres', function(req, res) {
		console.log('POST GENRES');
		
		Genre.findOne({ 'name': req.body.name }, function(err, genre) {
			if(err) {
				console.log(err);
				res.json(null);
			}
			
			if(!genre) {	// Genre does not already exist in db, create new
				genre = Genre.initGenre();
				genre.name = req.body.name;
			}

			// Set total value and count
			genre.value += parseFloat(req.body.value);
			genre.count += 1;
			genre.percent = genre.value/genre.count;
			
			// Set specific personality value and count
			var houseIndex = Genre.HOUSE_CONST[req.body.house];
			var house = genre.house[houseIndex];
			house.value += parseFloat(req.body.value);
			house.count += 1;
			house.percent = house.value/house.count;
			
			// Save result to database
			genre.save(function(err) {
				if(err) {
					console.log(err)
					res.json(null);
				}
				res.json(genre);
			});

		});
  });

	/**
	 *		POST - add username
	 */
	app.post('/api/music/users', function(req, res) {
		User.findOne({ 'name': req.body.name }, function(err, user) {
			if (err || user) {	// Error, or user already exists
				console.log('USER EXISTS');
				res.json(null);
			} else {						// Create new user
				console.log('ADD USER');
				User.create({
					name : req.body.name,
				}, function (err, newUser) {
					if (err) {
						console.log(err);
						res.json(null);
					}
					res.json(newUser);
				});
			};
		});
	});
}

module.exports = api;
