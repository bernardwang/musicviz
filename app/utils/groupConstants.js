// 
// 	groupConstants.js
//
//	Constants used for choosing genre group
//

var CONST = {
	
	'GENRES_MAX': 20,
	
	'GENRES': {
		'Pop',
		'Rock/Metal',
		'Folk/Country',
		'Jazz/Blues/Classical',
		'Hip-Hop/Rap',
		'Electronic/EDM/Dance',
	},
	
	'COMPARE_WEIGHTS': [0.5, 0.3, 0.2, 0.0],
	
	'COMPARE': [
		['Lady Gaga','Michael Jackson','Justin Timberlake','Katy Perry'],
		['Red Hot Chili Peppers','System of a Down','The White Stripes','David Bowie'],
		['Mumford & Sons','Lady Antebellum,','Rascal Flatts','Bob Dylan'],
		['Michael Bublé','Hozier','Tom Waits','Wolfgang Amadeus Mozart'],
		['Kanye West','Eminem','Beastie Boys','Nicki Minaj'],
		['Daft Punk','Skrillex','The Prodigy','Passion Pit']
	]

};

module.exports = CONST;