


var item = select('#item');
var button = select('#submit');
button.mousePressed(checkThing);

function checkThing() {
	var url = 'countries/' + item.value();
	loadJSON(url, gotData);
}

function gotData(){
	console.log('received data');
	
}