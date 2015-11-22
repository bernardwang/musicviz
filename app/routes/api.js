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
    	if(err)
    	    res.send(err);
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
				res.send(err);
			}
			
			if(!genre) {	// genre does not already exist in db, create new
				genre = Genre.initGenre();
				genre.name = req.body.name;
			}

			// Set total value and count
			genre.value = 0;
			genre.value += parseInt(req.body.value);
			genre.count += 1;
			
			// Set specific personality value and count
			var personalityIndex = Genre.PERSONALITY_CONST[req.body.personality];
			genre.personality[personalityIndex].value += parseInt(req.body.value);
			genre.personality[personalityIndex].count += 1;
			
			// Save result to database
			genre.save(function(err) {
				if(err) {
					res.send(err);
				}
				res.json(genre);
			});

		});
  });  
}