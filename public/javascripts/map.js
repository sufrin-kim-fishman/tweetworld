// $(document).ready(function() {
// 	initialize();
// });

// function initialize() {
//     var mapOptions = {
// 	    center: new google.maps.LatLng(25, 10),
// 		zoom: 2
// 	};
// 	var map = new google.maps.Map(document.getElementById("map-canvas"),
//     							mapOptions);
// };
// google.maps.event.addDomListener(window, 'load', initialize);

// tweetListener();
// submitListener();

// function addADot($country, country) {
//   if($("#" + country).length === 0) {

//     var newCountry = "<div id='" + country + "'>" + 
//       "<h2>" + $country + "</h2><ul></ul></div>"
//     $(".tweet_country_holder").append(newCountry);
//   }
// }
$(document).ready(function() {
	initialize();
	tweetsMarker();
});

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(25, 10),
		zoom: 2
 	};
 		
 	var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
};

 	google.maps.event.addDomListener(window, 'load', initialize);

function tweetsMarker() {
  server.on('tweets', function(d) {
    d = JSON.parse(d);
    d3.json(d, function(data) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( {'address': address}, function(results, status) {
        	if(status === google.maps.GeocoderStatus.OK) {
        		var latitude = results[0].geometry.location.lat();
        		var longitude = results[0].geometry.location.lng();
        	}
        	var svgContainer = d3.select("body").append("svg")
	        .attr("width", 200)
	        .attr("height", 200);
			var circle = svgContainer.append("circle")
	        .attr("cx", latitude)
	        .attr("cy", longitude)
	        .attr("r", 20);
		});
	});
});
};


   //  	overlay.onAdd = function() {
   //  		var layer = d3.select(this.getPanes().overlayLayer).append("div")
   //  		.attr("class", d);
    	
   //  	overlay.draw = function() {
   //  		var projection = this.getProjection();

   //  		var marker = layer.selectAll("svg")
   //  		.data(d3.entries(data))
   //  		.each(trasnform)
   //  		.enter().append("svg:svg")
   //  		.each(transform)
   //  		.attr("class", "marker");

   //  		marker.append("svg:circle")
   //  		.attr("r", 4.5)
   //  		.attr("cx", 25)
   //  		.attr("cy", 25);

 		// 	function transform(d) {
 		// 		d = new google.maps.LatLng(d.value[0], d.value[1]);
 		// 		d = projection.fromLatLngToDivPixel(d);	
 		// 		return d3.select(this)
 		// 		.style("left", (d.x-25) + "px")
 		// 		.style("top", (d.y-25) + "px");
 		// 	}

 		// };
 		// };
 		// overlay.setMap(map);