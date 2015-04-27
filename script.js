var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here
var i = 0;
var results = [];

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    var displayArray = [];
    displayArray = results;
    console.log(results);
    
    for (i = 0; i < 12; i++) {
        // Check if description is null, if null, use deck, store to descriptionString
        var descriptionString = "";
        if (displayArray[i].description == null) {
            descriptionString = displayArray[i].deck;
            console.log(descriptionString);
        } else {
            descriptionString = displayArray[i].description;
        }
        // Truncate descriptionString
        descriptionString = descriptionString.slice(0,100);

        // Check if platform is array, and if it has multiple items store to platformString
        var platformString = "<br>";
        for (j = 0; j < displayArray[i].platforms.length; j++) {
            platformString += displayArray[i].platforms[j].name + ", ";
        }
        // Display image, which is an object not an array.
        imgURL = results[i].image.small_url;

        $('.results').append("<div class='col-md-4 images'><img src='" + imgURL + "'><br>" + "Name: " + results[i].name + "<p class='hidden'>Release Date: " + results[i].original_release_date + "<br>Platform(s): " + platformString + "<br>Description: " + descriptionString + "</p></div>");
    }

    $('.images').on('click', function () {
        $(this).toggleClass('big');
        $(this).children('p').toggleClass('hidden');
    });
}

$(document).ready(function() {

	// Start the search here!
	search('batman');
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
