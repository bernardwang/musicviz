//
//	api.js
//	
//	RESTful api for music collection
//

var Genre = require('../models/Genre');	
var Artist = require('../models/Artist');	

module.exports = function(app) {
	
	// Add comment to specified commit
	app.post('/api/music/genres', function(req, res) {
		var result;
		
		Genre.findOne({ 'name': req.body.name }, function(err, genre) {
			if(err) {	// genre does not already exist in db
      	// find generalized genre
				var personality = [];
				for(var i = 0; i < 4; i++) {
					personality.push(Genre.personality.create());
				}
				personality[req.body.personality].value = req.body.value;
				personality[req.body.personality].count = 1;
				
				result = new Genre({
					name				: req.body.name,													
					value				: { type: Number, default: 0 },		
					count				: { type: Number, default: 0 },		
					personality	: personality,									
					category		: 0 	// currently unused												
				});
			}
			else{ // existing genre, update it
				genre.value += req.body.value;
				genre.count += 1;
				var person = genre.personality[req.body.personality];
				person.value += req.body.value;
				person.count += 1;
				genre.personality[req.body.personality] = person;
				
				genre.save(function(err) {
					if(err) {
						res.send(err);
					}
					result = genre;
				});
			}
			
			res.json(result);
		});
  });  
}