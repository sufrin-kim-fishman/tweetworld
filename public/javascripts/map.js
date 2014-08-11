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
var server = io.connect('http://localhost:8080/map');
server.on('error', function() {
  server.socket.connect();
});
$(document).ready(function() {
  initialize();
  // tweetsMarker();
  // tweety();
});

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(25, 10),
    zoom: 2
  };

 var map = new google.maps.Map(document.getElementById("map-canvas"),
  mapOptions);
}

 google.maps.event.addDomListener(window, 'load', initialize);

    var map = new google.maps.Map(d3.select("#map-canvas").node(), {
    zoom: 2,
    center: new google.maps.LatLng(25, 10)
    });

   //  function tweety() {
   //   d3.select("#map-canvas").append("svg")
   //   .attr("width", 50).attr("height", 50)
   //   .append("circle").attr("cx", 25)
   //   .attr("cy", 25).attr("r", 25)
   //   .style("fill", "purple");
   // }
      // var svgContainer = d3.select("#map-canvas").append("svg")
      //     .attr("width", 600)
      //     .attr("height", 600);
      //     console.log(svgContainer);
      // var circle = svgContainer.append("circle")
      //     .attr("cx", 25)
      //     .attr("cy", 10)
      //     .attr("r", 20);
      //     console.log(circle);
    // }
    
    function tweetsMarker() {
      server.on('tweets', function(d) {
        d = JSON.parse(d);
        d3.json(d, function(data) {
          var svgContainer = d3.select("#map-canvas").append("svg")
          .attr("width", 200)
          .attr("height", 200);
          console.log(svgContainer);
          var circle = svgContainer.append("circle")
          .attr("cx", d.coordinates.coordinates[0])
          .attr("cy", d.coordinates.coordinates[1])
          .attr("r", 20);
          console.log(circle);
      });
    });
  }


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