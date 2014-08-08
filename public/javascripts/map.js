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

	var map = new google.maps.Map(d3.select("#map-canvas").node(), {
		zoom: 8,
		center: new google.maps.LatLng(25, 10)
});

function addAMarker(location) {
	var wrap = new google.maps.OverlayView();
	wrap.onAdd = function() {
		var contain = d3.select(this.getPanes().overlayWrap).append("div")
		.attr("class", "locations");

		wrap.draw = function() {
			var projection = this.getProjection();
		
			var marker = contain.selectAll("svg")
			.data(d3.entries(locations))
			.each(transform)
			.enter().append("svg:svg")
			.each(transform)
			.attr("class", "marker");
			marker.append("svg:circle")
			.attr("r", 4.5)
			.attr("cx", 25)
			.attr("cy", 25)
		};

		function transform(d) {
			d = new google.maps.LatLng(d.value[0], d.value[1]);
			d = projection.fromLatLngToDivPixel(d);	
			return d3.select(this)
			.style("left", (d.x-25) + "px")
			.style("top", (d.y-25) + "px");
		}

	};
}

wrap.setMap(map);