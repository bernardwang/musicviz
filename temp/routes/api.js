//
//	api.js
//	
//	RESTful api for commits
//

var Attribute = require('../models/Attribute');	

module.exports = function(app) {
	
	// Add comment to specified commit
	app.post('/api/commits/:id/comments', function(req, res) {
  	Commit.findById(req.params.id, function(err, commit) {
			if(err) {
      	res.send(err);
			}	
			
			// Append new comment sub document
			var comment = commit.comments.create({
				text: req.body.text
			});
			commit.comments.push(comment);
			
			// Save to db
			commit.save(function(err) {
      	if(err) {
					res.send(err);
				}
				res.json(commit);
			});
    });
  }); 
 
}