let searchInputE1 = document.getElementById("searchInput");
let resultCountriesE1 = document.getElementById("resultCountries");
let spinnerE1 = document.getElementById("spinner");

let searchInputValue = "";
let countriesList = [];

function CreateAndAppendCountries(countriesList) {
    let {
        flag,
        name,
        population
    } = countriesList;

    let cardcontainer = document.createElement("div");
    cardcontainer.classList.add("country-card", "container", "row", "col-12", "col-md-6");
    resultCountriesE1.appendChild(cardcontainer);

    let imgE1 = document.createElement("img");
    imgE1.src = flag;
    imgE1.classList.add("country-flag", "mr-3");
    cardcontainer.appendChild(imgE1);

    let containerE2 = document.createElement("div");

    let HeadingE1 = document.createElement("h1");
    HeadingE1.textContent = name;
    HeadingE1.classList.add("country-name");
    containerE2.appendChild(HeadingE1);
    cardcontainer.appendChild(containerE2);

    let paragraphE1 = document.createElement("p");
    paragraphE1.textContent = population;
    paragraphE1.classList.add("country-population");
    containerE2.appendChild(paragraphE1);
    cardcontainer.appendChild(containerE2);
}

function displayResults() {
    resultCountriesE1.textContent = "";
    for (let countries of countriesList) {
        let countryName = countries.name;
        if (countryName.includes(searchInputValue)) {
            CreateAndAppendCountries(countries);
        }
    }
}

function getcountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    spinnerE1.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerE1.classList.add("d-none");
            countriesList = jsonData;
            for (let populationCounries of countriesList) {
                CreateAndAppendCountries(populationCounries);
            }
        });
}


function onchangeSearchInput() {
    searchInputValue = searchInputE1.value;
    displayResults();
}
getcountries();
searchInputE1.addEventListener("keyup", onchangeSearchInput);