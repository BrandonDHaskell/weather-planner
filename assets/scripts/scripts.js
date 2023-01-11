
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
      alert('Unable to connect to current weather');
      console.log(error);
    });
}

function displayCurrentWeather(data){
    console.log(data);
    $('#for-city').text(data.name + " - " + data.weather[0].main);
    
    $('#current-temp').text(data.main.temp);
    $('#feels-like').text(data.main.feels_like);
    $('#high-low').text(data.main.temp_max + "/" + data.main.temp_max);
    $('#high-low').text(data.main.feels_like);
    $('#current-humidity').text(data.main.humidity + "%");
    $('#current-pressure').text(data.main.pressure);
    $('#current-clouds').text(data.clouds.all + "%");
    $('#current-wind').text(data.wind.deg + " / " + data.wind.speed);

}