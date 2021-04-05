"use strict";

(function () {
    function sort(array, isAscending) {
        var comparator = (isAscending === true) ? function (e1, e2) {
            return e1 - e2;
        } : function (e1, e2) {
            return e2 - e1;
        };

        return array.slice(0).sort(comparator);
    }

    function getSubarrayFirst(array, elementsCount) {
        if (elementsCount > array.length) {
            throw new Error("Количество элементов подмассива (" + elementsCount + ") превышает размер массива (" + array.length + ")");
        }

        return array.slice(0, elementsCount);
    }

    function getSubarrayLast(array, elementsCount) {
        if (elementsCount > array.length) {
            throw new Error("Количество элементов подмассива (" + elementsCount + ") превышает размер массива (" + array.length + ")");
        }

        return array.slice(array.length - elementsCount);
    }

    function getEvenNumbersSum(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).reduce(function (e1, e2) {
            return e1 + e2;
        }, 0);
    }

    function getSquaredEvenNumbersList(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).map(function (e) {
            return e * e;
        });
    }

    var array1 = [9, 3, 6, 5, 4, 7, 0, 8];

    console.log("Исходный массив array1:");
    console.log(array1.join(", "));

    console.log("Массив после сортировки по убыванию:");
    console.log(sort(array1, false).join(", "));

    console.log("Подмассив из первых 5 элементов:");
    console.log(getSubarrayFirst(array1, 5).join(", "));

    console.log("Подмассив из последних 5 элементов:");
    console.log(getSubarrayLast(array1, 5).join(", "));

    console.log("Сумма четных элементов массива:");
    console.log(getEvenNumbersSum(array1));

    var array2 = [];

    for (var i = 1; i <= 100; i++) {
        array2.push(i);
    }

    console.log("Исходный массив array2:");
    console.log(array2.join(", "));

    console.log("Список квадратов четных элементов массива array2:");
    console.log(getSquaredEvenNumbersList(array2).join(", "));
})();