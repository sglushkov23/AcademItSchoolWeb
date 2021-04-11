"use strict";

(function () {
    function getCountriesWithMaximumCitiesCount(countries) {
        var countriesListSortedByCitiesCount = countries.map(function (country) {
            return {
                countryName: country.name,
                citiesCount: country.citiesList.length
            };
        }).sort(function (e1, e2) {
            return e2.citiesCount - e1.citiesCount;
        });

        var maximumCitiesCount = countriesListSortedByCitiesCount[0].citiesCount;

        return countriesListSortedByCitiesCount.filter(function (e) {
            return e.citiesCount === maximumCitiesCount;
        }).map(function (e) {
            return e.countryName;
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

    var countriesNames = ["Russia", "Germany", "United States of America", "Spain"];

    var citiesNames = [
        ["Moscow", "Saint Petersburg", "Novosibirsk", "Kazan", "Sochi"],
        ["Berlin", "Hamburg", "Munich"],
        ["Miami", "New York", "San Francisco", "Seattle", "Philadelphia"],
        ["Barcelona", "Valencia", "Malaga"]
    ];

    var citiesPopulation = [
        [12678079, 5398064, 1625600, 1143535, 343334],
        [3769495, 1841179, 1484226],
        [463347, 8622698, 884363, 608660, 1526006],
        [1636762, 801456, 574654]
    ];

    var zippedArrays = countriesNames.map(function (item, i) {
        return [item, [citiesNames[i], citiesPopulation[i]]];
    });

    var countries = zippedArrays.map(function (zippedElement) {
        return {
            name: zippedElement[0],
            citiesList: zippedElement[1][0].map(function (e, index) {
                return {
                    name: e,
                    population: zippedElement[1][1][index]
                };
            })
        };
    });

    console.log("Array of countries objects:");
    console.log(countries);

    console.log("Array of countries with maximum number of cities:");
    console.log(getCountriesWithMaximumCitiesCount(countries));

    console.log("Object with 'country name' to 'total population' map:");
    console.log(getObjectWithCountryNameToPopulationMap(countries));
})();