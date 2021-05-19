var express = require("express");
var router = express.Router();

var records = [];
var newId = 0;

// /api/getRecords?searchText=text
router.get("/api/getRecords", function (req, res) {
    var searchText = (req.query.searchText || "").toUpperCase();

    var result = records.filter(function (r) {
        return searchText === "" ||
            r.surname.toUpperCase().indexOf(searchText) >= 0 ||
            r.name.toUpperCase().indexOf(searchText) >= 0 ||
            r.phone.toUpperCase().indexOf(searchText) >= 0;
    });

    res.send(result);
});

// { ids: [1, 3, 5] }
router.post("/api/deleteRecords", function (req, res) {
    var ids = req.body.ids;
    var idsSet = new Set(ids);

    records = records.filter(function (r) {
        return !idsSet.has(r.id);
    });

    res.send({
        success: true,
        message: null
    });
});

// { record : { surname, name, phone } }
router.post("/api/createRecord", function (req, res) {
    var record = req.body.record;

    if (!record) {
        res.send({
            success: false,
            message: "Неверный формат данных"
        });

        return;
    }

    if (!record.surname) {
        res.send({
            success: false,
            message: "Необходимо задать фамилию"
        });

        return;
    }

    if (!record.name) {
        res.send({
            success: false,
            message: "Необходимо задать имя"
        });

        return;
    }

    if (!record.phone) {
        res.send({
            success: false,
            message: "Необходимо задать номер телефона"
        });

        return;
    }

    if (records.some(function (r) {
        return r.phone.toUpperCase() === record.phone.toUpperCase();
    })) {
        res.send({
            success: false,
            message: "Запись с таким номером телефона уже существует"
        });

        return;
    }

    record.id = newId;
    newId++;

    records.push(record);

    res.send({
        success: true,
        message: null
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render("index", {title: "Express"});
});

module.exports = router;