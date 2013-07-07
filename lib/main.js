module.exports = function (opts) {
	opts = opts || {};
	var db = require('./tdb.js');
	var ObjectID = opts.ObjectID || opts.nativeObjectID&&require('mongodb').ObjectID || require('./ObjectId');
	if (typeof ObjectID.prototype.valueOf!='function') {
		ObjectID.prototype.valueOf = function () {
			return this.toString();
		}
	}
	function gdb (path,optsLocal) {
		gdb.superclass.constructor.call(this, path, optsLocal, opts);
		this.ObjectID = ObjectID;
		this.Code = require('./tcode.js').Code;
		this.Binary = require('./tbinary.js').Binary;
		this.Finder = require("./finder")(this);		
	}
	gdb.prototype = Object.create(db.prototype);
	gdb.prototype.constructor = gdb;
	gdb.superclass = db.prototype;
	return {
		Db:gdb,
		Collection:require('./tcoll.js'),
		Code:require('./tcode.js').Code,
		Cursor:require('./tcursor.js'),
		Binary:require('./tbinary.js').Binary,
		ObjectID:ObjectID
	};
}
