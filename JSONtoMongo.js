'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
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


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

listingsJSON.entries.forEach(function (listing) {
  var listingModel = new Listing(listing);
  listingModel.save();
});



/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */


 /* table view for mLab:

{
    "Code": "code",
    "Name": "name",
    "Address": "address",
    "Latitude": "coordinates.latitude",
    "Longitude": "coordinates.longitude",
    "Created" : "created_at",
    "Last Updated" : "updated_at"
}

*/