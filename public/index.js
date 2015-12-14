 



var button = document.getElementById('submit');


function throwSearch() {
	var item = select('item');
	item = item.value;
	console.log("a search was requested " + item);
	var url = 'countries/USA/' + item;

	//loadJSON(url, gotData);
}

function gotData(){
	console.log('received data');
	
}