//
//	api.js
//	
//	RESTful api for music collection
//

var Genre = require('../models/Genre');	
var Artist = require('../models/Artist');	

module.exports = function(app) {
	
	// Add comment to specified commit
	/*app.post('/api/commits/:id/comments', function(req, res) {
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
    
	// Delete comment from specified commit
	app.delete('/api/commits/:id/comments/:comment_id', function(req, res) {
		Commit.findById(req.params.id, function(err, commit) {
			if(err) {
      	res.send(err);
			}	

			// Removes matching comment
			for(var i = 0; i<commit.comments.length; i++) {
				if(commit.comments[i]._id == req.params.comment_id) {
					commit.comments.splice(i,1);
					// Save to db
					commit.save(function(err) {
      			if(err) {
							res.send(err);
						}
						res.json(commit);
					});
				}
			}
			
		});
	});*/
 
}