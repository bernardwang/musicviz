//
//	api.js
//	
//	RESTful api for music collection
//

var Genre = require('../models/Genre');	
//var Artist = require('../models/Artist');	

module.exports = function(app) {
	
	/**
	 *		GET - gets all genre data
	 */
	app.get('/api/music/genres', function(req, res) {
    console.log('GET');
		
		Genre
		.find({})
		.sort({ value: -1 })
		.limit(20)
		.exec(function(err, genres) {
    	if(err){
				console.log(err);
    	  res.send(null);
			}
    	res.json(genres); 
    });
	});
	
	/**
	 *		POST - add genre data
	 *		TODO allow list of genres to be added with one ajax call
	 */
	app.post('/api/music/genres', function(req, res) {
		console.log('POST');
		
		Genre.findOne({ 'name': req.body.name }, function(err, genre) {
			if(err) {
				console.log(err);
				res.send(null);
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
			var personalityIndex = Genre.PERSONALITY_CONST[req.body.personality];
			var personality = genre.personality[personalityIndex];
			personality.value += parseFloat(req.body.value);
			personality.count += 1;
			personality.percent = personality.value/personality.count;
			
			// Save result to database
			genre.save(function(err) {
				if(err) {
					console.log(err)
					res.send(null);
				}

				res.json(genre);
			});

		});
  });  
}
