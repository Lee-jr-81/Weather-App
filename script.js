// -------------------  API key setup  --------------------------------
//
let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistory = [];
let searchHistoryContainer = $("#history");
const weatherAPIURL = "https://api.openweathermap.org";
const weatherAPIKey = "f6e9363350029ec2bfab3e53505ac9c5";
//
//
// -------------------  Function setup  -------------------------------
//
function fetchCoordinates(search) {
  let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKey}`;

  fetch(queryURL, { method: "GET" })
    .then(function (data) {
      return data.json();
    })
    .then(function (response) {
      if (!response[0]) {
        alert("Location not found");
      } else {
        if (searchHistory.indexOf(search) !== -1) {
          return;
        }
        searchHistory.push(search);
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        searchHistoryContainer.html("");

        for (let i = 0; i < searchHistory.length; i++) {
          let btn = $("<button>");
          btn.attr("type", "button");
          btn.addClass("history-btn btn-history");
          btn.attr("data-search", searchHistory[i]);
        }
      }
    });
}

function submitSearchForm(event) {
  event.preventDefault();
  let search = searchInput.val().trim();
  fetchCoordinates(search);
}

searchForm.on("submit", submitSearchForm);
