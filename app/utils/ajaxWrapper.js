var $ = require('jQuery');

var ajaxWrapper = function(url, type, data, dataType, callback) {
	$.ajax({
    url: url,
    type: type,
    data: data,
		dataType: dataType,
    success: callback,
		error: function(request, status, errorThrow) {
			console.log('API call error');	
		}
	});
}

module.exports = ajaxWrapper;