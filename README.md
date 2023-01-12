# Weather Planner

Welcome to Weather Planner!  Feel free to try it out at the deployed site below.  Enter in a city name and select the country then click search.

See the weather all around the world if you want to!

See the [Deployed Site](https://bhaskell7901.github.io/weather-planner/)


## Table of Contents

1. [Technology Used](#technology-used)
2. [Overview and Strategies](#overview-and-strategies)
3. [Recent Search Buttons](#recent-search-buttons)
4. [Country Dropdow List](#country-dropdow-list)
5. [Bonus Features](#bonus-features)
6. [Usage](#usage)
7. [Learning Points](#learning-points)
8. [Author Info](#author-info)
9. [License](#license)


## Technology Used 

| Technology | Resource URL | 
| ------------- | ------------- | 
| HTML | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) |
| CSS | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| Git | [https://git-scm.com/](https://git-scm.com/) |  
| JQuery | [https://jquery.com/](https://jquery.com/) |
| Day.js | [https://day.js.org/](https://day.js.org/) |
| Open Weather API | [https://openweathermap.org/api](https://openweathermap.org/api) |


## Overview and Strategies

A general overview of the Daily Scheduler flow is:
1. Load the page
1. Handle previously searched options
1. Add event listener to seach button
1. When the search button is clicked (or a Recent Searches button)
    1. Call the ```Open Weather API``` and update the page
    1. Add a new search button to the Recent Searches section
    1. Update local storage

The Weather Planner is a static web page the calls the [Open Weather API](https://openweathermap.org/api) to update the page with weather information pertaining the city entered.  It also uses ```localStorage``` to save previous searches.  The page is dynamically updated with current weather conditions, forecasted conditions and icons that represent weather conditions.

For the city search option, I chose to implement a regex check that ensure only letters and spaces can be submitted.  This was to prevent submitted a request when it would be known to fail.  The check is not capable of validating city spelling prior to submitting the request.

Currently, two requests are submitted: one to the current weather, and one to the forcasted weather.  This was done to speed up page loading.  However, this means if a city is mispelled both requests will error.  This may need to be updated to chain the requests together to ensure there is only one failed request before prompting the user to validate the city spelling.

The current search has a bug due to the way the [Open Weather API](https://openweathermap.org/api) is implemented.  Currently, if a user were to search for a city name that exists in two states (ex. Portland, ME and Portland, OR), the results are unpredictable.  This can be further resolved by calling a third API that takes a state name.  However, this would require a conditional update to the form when the country of US is chosen to include a state selector.  Additionally, the 'same name city collision issue' is also and issue in other countries like Canada.  After checking the API docs and testing, it doesn't appear the state value could be used as Provinces in Canada to resolve the 'same name city collision issue'.  This issue may mean an entire refactoring of the webpage to pull from the city specific API.


## Recent Search Buttons

When a search is conducted, a button is added to the list of Recent Searches.  The current implementation limits recent searces to 5 cities.  A back up of the buttons is stored in ```localStorage``` as an array of objects that contains the ```city``` name and the ```countryId```.  This is loaded, if it exists, once the page loads and buttons are generated from those objects.


## Country Dropdow List

The country list was populated using the the ISO 1866 standard that the API calls for.  After some light testing, it does work for multiple countries: Canada, Italy, France, etc.  However, the complete list was not tested.  Results may vary for weather data from other countries.

## Bonus Features

* Added Country selector to the Serach Form - (Complete: [Issue#4](https://github.com/bhaskell7901/weather-planner/issues/4) )
* Dynamicall update background based on weather - (Pending: [Issue#9](https://github.com/bhaskell7901/weather-planner/issues/9) )


## Usage


To use Weather Planner, just navigate to the [Live Site](https://bhaskell7901.github.io/weather-planner/).  Once the page loads, enter the city you want to get the weather about, then select the country and click Search.  Current weather and forecasted weather are retrieved and displayed.


## Learning Points 

I learned a lot about the ```fetch``` funtion and handing request errors.  I also learned a lot more about Projects in GitHub.  I'm looking forward to utilizing that are for our team project.   


## Author Info

### Brandon Haskell

* [LinkedIn](https://www.linkedin.com/in/BrandonDHaskell)
* [Github](https://github.com/bhaskell7901)

## License

MIT License