
function getCurrentWeather(){
    let appKey = 'e4e0f68bb1acce51f75f4879a29e72e0';
    var cityName = $('#city').val().trim();
    var countryId = $('#country').children('option').filter(':selected').val();
    
    var urlStr = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + countryId + "&appid=" +appKey;

    fetch(urlStr)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            displayCurrentWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
}

function displayCurrentWeather(data){
    console.log(data);
}