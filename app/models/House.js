//
//	House.js
//
//	Sub-document schema for House categories
//	In this case, Hogwarts Houses
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HouseSchema = new Schema({
	//name		: String,		// instead of keeping track of House by name, use constants defined in Genre
	value		: { type: Number, default: 0 },
	count		: { type: Number, default: 0 },
	percent : { type: Number, default: 0 }
});

module.exports = HouseSchema;
