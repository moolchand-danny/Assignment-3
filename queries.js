/* Fill out these functions using Mongoose queries*/
var fs = require('fs'),
  mongoose = require('mongoose'),
  Listing = require('./ListingSchema.js'),
  config = require('./config.js'),
  listingsJSON = require('./listings.json');


/* Connect to your database */
//changed it so that it uses the new updated syntax
var promise = mongoose.connect(config.db.uri, {
  useMongoClient: true
});

// node.js needs to wait for mongoose to finish operations before closing connection, give it 1sec
setTimeout(function () {
  mongoose.connection.close();
}, 1000);


var findLibraryWest = function () {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

  Listing.findOne({ name: 'Library West' }, function (err, data) {
    if (err) throw err;
    console.log(data);
  });

};

var removeCable = function () {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */

  Listing.findOneAndRemove({ code: 'CABL' }, function (err, data) {
    if (err) throw err;
    console.log(data);
  });

};

var updatePhelpsLab = function () {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

  Listing.findOneAndUpdate({ code: 'PHL' }, { address: '1953 Museum Rd, Gainesville, FL 32603' }, function (err, data) {
    if (err) throw err;
    console.log(data);

  });

};

var retrieveAllListings = function () {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

  Listing.find({}, function (err, data) {
    if (err) throw err;
    console.log(data);
  });

};


findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();