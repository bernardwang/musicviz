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
		Genre.findOne({ 'name': req.body.name }, function(err, genre) {
			if(err) {	// genre does not already exist in db
      	// create new genre
				genre = Genre.initGenre();
				genre.name = req.body.name;
			}
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
				res.json(genre);
			});
		});
  });  
}