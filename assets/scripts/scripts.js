function buttonClick(){
  let reg = /^[a-zA-Z\s]*$/;
  var city = $('#city').val().trim();
  var countryId = $('#country').children('option').filter(':selected').val();

  
  if( reg.test(city) ){
    getWeatherData("weather", city, countryId);
    getWeatherData("forecast", city, countryId);
    addToRecentSearch(city, countryId);
  } else {
    alert("Invalid city!");
  }
}

function getWeatherData(wxType, city, countryId){
  let appKey = 'e4e0f68bb1acce51f75f4879a29e72e0';
  
  let urlStr = "https://api.openweathermap.org/data/2.5/" + wxType + "?q=" + city + "," + countryId + "&units=imperial&appid=" + appKey;
  
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
  let arr = data.list;

  $('#fcst-cards').html("");
  for(var i = 0; i < arr.length; i += 8 ){
    var cardEl = $('<div>').addClass("card border-secondary mb-2").css("width", "10rem");
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

function addToRecentSearch(city, countryId){
  var recentList = $('#recent-searches-list');
  var newBtn = $('<button>').addClass("btn btn-secondary").attr("type", "button").attr("data-country", countryId).text(city);

  newBtn.on("click", function(event){
    event.preventDefault();
    getWeatherData("weather", event.currentTarget.textContent, event.currentTarget.dataset.country);
    getWeatherData("forecast", event.currentTarget.textContent, event.currentTarget.dataset.country);
  });

  recentList.prepend(newBtn);

  if( recentList.children().length > 5 ){
    recentList.children().last().remove();
  }
  storeButtonList();

}

function storeButtonList(){
  var recentSearchList = $('#recent-searches-list').children();

  if ( recentSearchList.length > 0){
    var arr = [];
    for( var i = 0; i < recentSearchList.length; i++){
      var buttonObj = {
        city : recentSearchList[i].textContent,
        countryId : recentSearchList[i].dataset.country
      }
      arr.push(buttonObj);
    }
    localStorage.setItem('buttonList', JSON.stringify(arr));
  }

}

function getStoredButtonList(){
  var list = localStorage.getItem("buttonList");

  if( list ){
    var arr = JSON.parse(list);

    for( var i = 0; i < arr.length; i++ ){
      addToRecentSearch(arr[i].city, arr[i].countryId);
    }
  }
}

$('#search-form').on("submit", function(event){
  event.preventDefault();
  buttonClick();
});

window.addEventListener("load", getStoredButtonList)