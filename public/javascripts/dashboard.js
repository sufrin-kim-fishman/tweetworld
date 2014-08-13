function scrapeUsername() {
  return $("#username").text();
}

function sendUsername() {
  server.emit('username', scrapeUsername());
}

function getUsersCountries() {
  server.on('username', function(countries) {
    populateUsersCountries(countries);
  });
}

function populateUsersCountries(countries) {
  for (var i = 0; i < countries.length; i++) {
    var country = countries[i]['name'];
    var normalizedCountry = normalizeName(country);
    addNewCountry(normalizedCountry, country);
  }
  deleteCountry();
}

function submitListenerToPersist() {
  $("#submit").click(function(e) {
    var $country = $("#country").val();
    persistCountry($country);
    e.preventDefault();
  });
}

function persistCountry(country) {
  var persistCountryObj = {
    name: country,
    user: scrapeUsername()
  };
  server.emit('persistCountry', JSON.stringify(persistCountryObj));
}

function deleteCountry() {
  $(".delete").click(function(e) {
    var country = $(this).parent().find("h2").text();
    var deleteCountryObj = {
      name: country,
      user: scrapeUsername()
    };
    server.emit('deleteCountry', JSON.stringify(deleteCountryObj));
  });
}

$(function() {
  getUsersCountries();
  sendUsername();
  submitListenerToPersist();
});