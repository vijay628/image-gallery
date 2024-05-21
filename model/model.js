var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String,
		path: String  // Add this field
	}
});

module.exports = mongoose.model('Image', imageSchema);
