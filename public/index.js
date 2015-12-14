 





function throwSearch() {
	var item = document.getElementById('item');
	var button = document.getElementById('submit');
	item = item.value;
	console.log("a search was requested for " + item);
	

	//make a query to the API
	var url = 'countries/USA/' + item;



	//loadJSON(url, gotData);
}

function gotData(){



	console.log('received data');
	
}