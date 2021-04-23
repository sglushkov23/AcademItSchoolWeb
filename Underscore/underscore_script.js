"use strict";

(function () {
    function getMeanAge(people) {
        return _.chain(people)
            .pluck("age")
            .reduce(function (memo, e) {
                return memo + e
            }, 0) / people.length;
    }

    function getSortedPeopleListOfGivenAgesRange(people, minAge, maxAge) {
        return _.chain(people)
            .filter(function (e) {
                return e.age >= minAge && e.age <= maxAge;
            })
            .sortBy("age")
            .value();
    }

    function addFullNameField(people) {
        var peopleCopy = $.extend(true, [], people);

        _.each(peopleCopy, function (e) {
            e.fullName = e.lastName + " " + e.name;
        });

        return peopleCopy;
    }

    var people = [
        {age: 42, name: "Иван", lastName: "Иванов"},
        {age: 57, name: "Петр", lastName: "Петров"},
        {age: 22, name: "Анна", lastName: "Антонова"},
        {age: 53, name: "Татьяна", lastName: "Андреева"},
        {age: 65, name: "Людмила", lastName: "Степанова"},
        {age: 23, name: "Дарья", lastName: "Бородина"},
        {age: 11, name: "Дмитрий", lastName: "Чернов"},
        {age: 30, name: "Андрей", lastName: "Гусев"},
        {age: 21, name: "Максим", lastName: "Кузнецов"},
        {age: 14, name: "Федор", lastName: "Мальцев"}
    ];

    console.log("1) Исходный список людей:");
    console.log(people);

    console.log("2) Средний возраст людей: " + getMeanAge(people));

    console.log("3) Список людей с возрастом от 20 до 30 лет:");
    console.log(getSortedPeopleListOfGivenAgesRange(people, 20, 30));

    console.log("4) Список людей после добавления поля fullName:");
    console.log(addFullNameField(people));
})();