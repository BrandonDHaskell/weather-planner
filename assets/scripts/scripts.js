
function buttonClick(){
  getWeatherData("weather");
  getWeatherData("forecast");
}

function getWeatherData(wxType){
  let appKey = 'e4e0f68bb1acce51f75f4879a29e72e0';
  let cityName = $('#city').val().trim();
  let countryId = $('#country').children('option').filter(':selected').val();
  
  let urlStr = "https://api.openweathermap.org/data/2.5/" + wxType + "?q=" + cityName + "," + countryId + "&units=imperial&appid=" + appKey;
  
  fetch(urlStr)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if( wxType === 'weather' ){
          displayCurrentWeather(data);
        }
        if( wxType === 'forecast' ){
          displayForecastedWeather(data);
        }
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
    $('#high-low').text(data.main.temp_max + "/" + data.main.temp_min);
    $('#current-humidity').text(data.main.humidity + "%");
    $('#current-pressure').text(data.main.pressure);
    $('#current-clouds').text(data.clouds.all + "%");
    $('#current-wind').text(data.wind.deg + "/" + data.wind.speed);
    $('#current-vis').text(data.visibility);

}

function displayForecastedWeather(data){
  console.log(data);
  let arr = data.list;

  $('#fcst-cards').html("");
  for(var i = 0; i < arr.length; i += 8 ){
    var cardEl = $('<div>').addClass("card border-secondary mb-2").css("max-width", "10rem");
    var cardHeaderEl = $('<div>').addClass("card-header");
    var cardBodyEl = $('<div>').addClass("card-body text-secondary");
    var cardBodyHeaderEl = $('<h5>').addClass("card-title");
    var cardTextHighLowEl = $('<p>').addClass("card-text");
    var cardTextHumidityEl = $('<p>').addClass("card-text");
    
    cardHeaderEl.text(dayjs(arr[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("dddd"));
    cardBodyHeaderEl.text(arr[i].weather[0].description);
    cardTextHighLowEl.text("High/Low: " + arr[i].main.temp_max + "/" + arr[i].main.temp_min);
    cardTextHumidityEl.text("Humidity: " + arr[i].main.humidity + "%")

    cardBodyEl.append(cardBodyHeaderEl).append(cardTextHighLowEl).append(cardTextHumidityEl);
    cardEl.append(cardHeaderEl).append(cardBodyEl);

    $('#fcst-cards').append(cardEl);
  }
}
