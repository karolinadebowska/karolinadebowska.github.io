function populateData () {
var mockDatabase = [
		{ _id: 'A', price: '18', size: 'S' },
        { _id: 'G', price: '54', size: 'S' },
		{ _id: 'B', price: '45', size: 'L' },
        { _id: 'I', price: '70', size: 'L' },
		{ _id: 'D', price: '99', size: 'L' },
		{ _id: 'E', price: '89', size: 'L' },
		{ _id: 'F', price: '65', size: 'S' },
		{ _id: 'H', price: '69', size: 'L' },
        { _id: 'J', price: '16', size: 'S' },
        { _id: 'K', price: '35', size: 'S' },
        { _id: 'C', price: '35', size: 'S' },
	];
	function renderList (results) {
		var resultsList = document.getElementById('sortedList');
        while (resultsList.firstChild) 
            resultsList.removeChild(resultsList.firstChild);
		var resultsList = results.map(function (result, index) {
			return '<div class="listing"><img class="img_listing" src=images/' + result._id + '.jpg><p>Name: '+result._id+'</p>Price: ' + result.price + '$</p><p>Size: ' + result.size + '</p></div>';
		});
		resultsList.forEach(function (row) {
            document.getElementById("sortedList").insertAdjacentHTML("beforeend",row);
		});
	}
	renderList(mockDatabase);
    var size;
    var price;
    var sortBy;
    var filteredResults=mockDatabase; 
    function filter(value){
        function filtrSize(value) {
            filteredResults = filteredResults.filter(function (result) {
                if(value=='small' && result.size=='S')
                    return result.size;
                else if(value=="large" && result.size=='L')
                    return result.size;
                else if(value=='sizeAll'){
                    console.log(result.size)
                    return result.size;
                }
            });
            renderList(filteredResults);
        }
        function filtrPrice(value) {
            filteredResults = filteredResults.filter(function (result) {
                if(value=='20' && result.price<20)
                    return result.price;
                else if(value=="50" && result.price<50 && result.price>=20)
                    return result.price;
                else if (value =='70' && result.price<70 && result.price>=51)
                    return result.price;
                else if(value=='100' && result.price<100 && result.price>=71)
                    return result.price;
                else if(value=='priceAll')
                    return result.price;
            });
            renderList(filteredResults);
        }
          // Function to Order results list 
        function orderBy(sortValue) {
            var sortedResults = (sortValue === 'sortId') ? 
                filteredResults.sort(function (a, b) { 
                    var nameA = a._id.toUpperCase(); 
                    var nameB = b._id.toUpperCase(); 
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                }) : 
                filteredResults.sort(function (a, b) {
                    var priceA = a.price;
                    var priceB = b.price; 
                    if (priceA < priceB) {
                        return -1;
                    }
                    if (priceA > priceB) {
                        return 1;
                    }
            });
            renderList(sortedResults);
        }
        if(value=='small' || value=='large' || value=='sizeAll')
            size = value;
        else if(!isNaN(value) || value=="priceAll")
            price = value;
        else if(value=="sortPrice" || value == "sortId")
            sortBy = value;
        console.log(price, sortBy, size);

        if(size!= undefined){
            filtrSize(size);
        }    	
        if(price!= undefined){
            filtrPrice(price);
        }    
        if(sortBy!=undefined){
            orderBy(sortBy);
        }
        filteredResults=mockDatabase;
    }
    document.querySelector('#sortBy').addEventListener('change', function(event){
		filter(event.target.value);
	});
    document.querySelector('#size').addEventListener('change', function(event){
		filter(event.target.value);
	});
    document.querySelector('#price').addEventListener('change', function(event){
		filter(event.target.value);
	});
}

populateData();