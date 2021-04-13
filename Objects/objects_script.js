"use strict";

(function () {
    function getCountriesWithMaximumCitiesCount(countries) {
        var citiesCountsArray = countries.map(function (country) {
            return country.citiesList.length;
        });

        var maximumCitiesCount = Math.max.apply(null, citiesCountsArray);

        return countries.slice(0).filter(function (e) {
            return e.citiesList.length === maximumCitiesCount;
        });
    }

    function getObjectWithCountryNameToPopulationMap(countries) {
        var result = {};

        countries.forEach(function (country) {
            result[country.name] = country.citiesList.reduce(function (memo, e) {
                return memo + e.population;
            }, 0);
        })

        return result;
    }

    var countries = [{
        "name": "Russia",
        "citiesList": [
            {"name": "Moscow", "population": 12678079},
            {"name": "Saint Petersburg", "population": 5398064},
            {"name": "Novosibirsk", "population": 1625600},
            {"name": "Kazan", "population": 1143535},
            {"name": "Sochi", "population": 343334}
        ]
    }, {
        "name": "Germany",
        "citiesList": [
            {"name": "Berlin", "population": 3769495},
            {"name": "Hamburg", "population": 1841179},
            {"name": "Munich", "population": 1484226}
        ]
    }, {
        "name": "United States of America",
        "citiesList": [
            {"name": "Miami", "population": 463347},
            {"name": "New York", "population": 8622698},
            {"name": "San Francisco", "population": 884363},
            {"name": "Seattle", "population": 608660},
            {"name": "Philadelphia", "population": 1526006}
        ]
    }, {
        "name": "Spain",
        "citiesList": [
            {"name": "Barcelona", "population": 1636762},
            {"name": "Valencia", "population": 801456},
            {"name": "Malaga", "population": 574654}
        ]
    }]

    console.log("Array of countries objects:");
    console.log(countries);

    console.log("Array of countries with maximum number of cities:");
    console.log(getCountriesWithMaximumCitiesCount(countries));

    console.log("Object with 'country name' to 'total population' map:");
    console.log(getObjectWithCountryNameToPopulationMap(countries));
})();