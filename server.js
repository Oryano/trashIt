
var express = require('express');

var app = express();

var fs = require('fs'); //file system library

var all = fs.readFileSync('trashIt.json', 'utf8'); 
//console.log(all); //the whole JSON

var trashit = JSON.parse(all); //convert from JSON to JS obj

var server = app.listen(3006);
console.log('server started on port 3006...');

// Our "database" (in addition to what is in the AFINN-111 list)
// is "additional.json", check first to see if it exists
var additional;
var exists = fs.existsSync('additional.json');
if (exists) {
  // Read the file
  console.log('loading additional words');
  var txt = fs.readFileSync('additional.json', 'utf8');
  // Parse it  back to object
  additional = JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('No additional words');
  additional = {};
}

//serve static files from public:
app.use(express.static('public'));


///////////////////////////////////////////////////
///////////////////////////////////////////////////


/////a route that returns list of items for county input
app.get('/countries/:country', showCountry);

function showCountry(req, res) {
	var country = req.params['country']; //user input	
	if(trashit.countries[country] == undefined){
		res.send("The country you've asked is not in our DataBase");
	} else {
		res.send(trashit.countries[country]); //send the data for that country only	
	}
}

/////route returns the complete JSON OBJ
app.get('/all', showAll);

function showAll(req, res) {
	console.log("/all was requested");
	//wait for the file to load before rendering page
	res.send(trashit); //send the whaole obj
}

////route with country and item returns list related to item (bin + pic)
app.get('/countries/:country/:item', whereToThrow);

function whereToThrow(req, res){
	console.log("whereToThrow was called");
	var country = req.params['country'];
	var item = req.params['item'];
		console.log(item);
	if (trashit.countries[country] == undefined){
		res.send("The country you've asked is not in our DataBase");
	} else if(trashit.countries[country][item] == undefined){ 
		res.send("Can't find item - click to add it now!");
	} else {
		res.send(trashit.countries[country][item][0]);
	}
}

////route with country and item returns img of item
app.get('/countries/:country/:item/img', imgItem);


function imgItem(req, res){
	console.log("imgItem was called");
	var country = req.params['country'];
	var item = req.params['item'];
		console.log(item);
	var img = req.params['img'];


	if (trashit.countries[country] == undefined){
		res.send("The country you've asked is not in our DataBase");
	} else if(trashit.countries[country][item] == undefined){
		res.send("Can't find item - click to add it now!");
	} else if(trashit.countries[country][item][1] == undefined){
		res.send("Sorry - this item doesn't have an image yet!");
	} else {
		

		console.log("img is found");
		//fs.trashit.countries[country][item][1]
		//res.send( + )
		// app.use(express.static('/public/pictures_items' + trashit.countries[country][item][1]));
		//fs.readFileSync(trashit.countries[country][item][1], { encoding: 'base64' });
		res.send(trashit.countries[country][item][1]);
	}
}


////route to show bin info
app.get('/bins/:bin', infoBin);

function infoBin(req, res){
	console.log("bin info requested");
	var bin = req.params["bin"];
	//figure out how to connect the bin to the country
	res.send(trashit.bins[bin]);

}




app.get('/add/:newItem/:bin', addNewItem);

function addNewItem(req, res) {
	console.log("addNewItem was called");
	// you put it in the trashit variable
	var newItem = req.params['newItem']; //the item from user to add
	var bin = req.params['bin'];
	
	additional[newItem] = [bin, "URLpic"];

    // Let the request know it's all set
    var reply = {
    status: 'success',
    newItem: newItem,
    bin: bin
  }

	// Write a file each time we get a new word
  	// This is kind of silly but it works
  	var json = JSON.stringify(additional, null, 2);
  	fs.writeFile('additional.json', json, 'utf8', finished);
  	function finished(err) {
    	console.log('Finished writing trashit.json');
    	// Don't send anything back until everything is done
    	res.send(reply);    
  	}
}















