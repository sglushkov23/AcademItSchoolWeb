"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", ready);

    function ready() {
        var button = document.querySelector(".form > button");
        var input = document.querySelector("#celsiusTemperature");
        var outputKelvin = document.querySelector("#kelvinTemperature");
        var outputFahrenheit = document.querySelector("#fahrenheitTemperature");

        var lowestCelsiusTemperature = -273.15;

        function convertToKelvin(celsiusTemperature) {
            checkTemperature(celsiusTemperature);

            return celsiusTemperature - lowestCelsiusTemperature;
        }

        function convertToFahrenheit(celsiusTemperature) {
            checkTemperature(celsiusTemperature);

            return 1.8 * celsiusTemperature + 32;
        }

        function checkTemperature(temperature) {
            if (temperature < lowestCelsiusTemperature) {
                throw new Error("The temperature on the Celsius scale must be not less than " + lowestCelsiusTemperature + " degrees");
            }
        }

        var handler = function (e) {
            e.preventDefault();
            var celsiusTemperature = parseFloat(input.value);

            if (isNaN(celsiusTemperature)) {
                alert("Temperature must be a number");

                return;
            }

            try {
                outputKelvin.value = convertToKelvin(celsiusTemperature).toFixed(2);
                outputFahrenheit.value = convertToFahrenheit(celsiusTemperature).toFixed(2);
            } catch (err) {
                alert(err.message)
            }
        };

        button.addEventListener("click", handler);
        input.addEventListener("input", function () {
            outputKelvin.value = "";
            outputFahrenheit.value = "";
        })
    }
})();