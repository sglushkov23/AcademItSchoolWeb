"use strict";

(function () {
    function getCountriesWithMaximumCitiesCount(countries) {
        var citiesCounts = countries.map(function (country) {
            return country.cities.length;
        });

        var maximumCitiesCount = Math.max.apply(null, citiesCounts);

        return countries.filter(function (e) {
            return e.cities.length === maximumCitiesCount;
        });
    }

    function getObjectWithCountryNameToPopulationMap(countries) {
        var result = {};

        countries.forEach(function (country) {
            result[country.name] = country.cities.reduce(function (memo, e) {
                return memo + e.population;
            }, 0);
        })

        return result;
    }

    var countries = [{
        name: "Russia",
        cities: [
            {name: "Moscow", population: 12678079},
            {name: "Saint Petersburg", population: 5398064},
            {name: "Novosibirsk", population: 1625600},
            {name: "Kazan", population: 1143535},
            {name: "Sochi", population: 343334}
        ]
    }, {
        name: "Germany",
        cities: [
            {name: "Berlin", population: 3769495},
            {name: "Hamburg", population: 1841179},
            {name: "Munich", population: 1484226}
        ]
    }, {
        name: "United States of America",
        cities: [
            {name: "Miami", population: 463347},
            {name: "New York", population: 8622698},
            {name: "San Francisco", population: 884363},
            {name: "Seattle", population: 608660},
            {name: "Philadelphia", population: 1526006}
        ]
    }, {
        name: "Spain",
        cities: [
            {name: "Barcelona", population: 1636762},
            {name: "Valencia", population: 801456},
            {name: "Malaga", population: 574654}
        ]
    }];

    console.log("Array of countries objects:");
    console.log(countries);

    console.log("Array of countries with maximum number of cities:");
    console.log(getCountriesWithMaximumCitiesCount(countries));

    console.log("Object with 'country name' to 'total population' map:");
    console.log(getObjectWithCountryNameToPopulationMap(countries));
})();