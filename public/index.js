 

function setup(){
	noCanvas();



  // // Submit the score to the API
  // function submitscore() {
  //   // Make the url
  //   var url = '/add/' + wordinput.value() + '/' + scoreinput.value();
  //   // Use loadJSON
  //   loadJSON(url, submitted);
  //   function submitted(result) {
  //     // Just look at the reply in the console
  //     console.log(result);
  //   }
  // }

//item from user:
var item = select('item');
item = item.value;
//var button = document.getElementById('submit');
}

  //////////////////////////////////////////

function throwSearch() {

	console.log("a search was requested for " + item);

	//make a query for an item in the API
	var url = 'countries/USA/' + item;


	//get an image for that item
	var urlImg = 'countries/USA/' + item + "/img";


	loadJSON(url, gotData);

}

function gotData(){


	console.log(result);
	
}