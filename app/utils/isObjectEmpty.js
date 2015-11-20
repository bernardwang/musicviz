//
//	isObjectEmpty.js
//	
//	Probably overkill modularizing lol
//
 
var isObjectEmpty = function( obj ) { 
  for ( var prop in obj ) { 
    return false; 
  } 
  return true; 
}

module.exports = isObjectEmpty;