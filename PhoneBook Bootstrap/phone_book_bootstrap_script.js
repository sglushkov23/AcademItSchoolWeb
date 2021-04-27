"use strict";

$(function () {
    var surnameField = $("#surname");
    var nameField = $("#name");
    var phoneField = $("#phone");
    var surnameErrorMessage = $("#surname-error-message");
    var nameErrorMessage = $("#name-error-message");
    var phoneErrorMessage = $("#phone-error-message");
    var addButton = $("#add-button");
    var tableBody = $("#table-body");
    var deleteSelectedRowsButton = $("#delete-selected-rows-button");
    var allRowsSelector = $("#all-rows-selector");
    var dialog = $("#dialog");

    addButton.click(function (e) {
        e.preventDefault();

        var surname = surnameField.val().trim();
        var name = nameField.val().trim();
        var phone = phoneField.val().trim();

        if (isInvalidForm(surname, name, phone)) {
            return;
        }

        clearFormFields();
        addNewRecord(surname, name, phone);
    });

    deleteSelectedRowsButton.click(function () {
        tableBody.find("tr:has(:checked)").remove();
        renumberRows();
    });

    allRowsSelector.change(function () {
        $(".selector").prop("checked", this.checked);
    });

    function isInvalidForm(surname, name, phone) {
        surnameErrorMessage.text("");
        nameErrorMessage.text("");
        phoneErrorMessage.text("");

        if (surname === "") {
            surnameField.val("");
            surnameErrorMessage.text("Пожалуйста, введите фамилию");
            $(".surname-input-error").css({border: "1px solid red"});
        }

        if (name === "") {
            nameField.val("");
            nameErrorMessage.text("Пожалуйста, введите имя");
            $(".name-input-error").css({border: "1px solid red"});
        }

        if (phone === "") {
            phoneField.val("");
            phoneErrorMessage.text("Пожалуйста, введите номер телефона");
            $(".phone-input-error").css({border: "1px solid red"});
        }

        var hasGivenPhone = hasGivenPhoneNumber(phone);

        if (hasGivenPhone) {
            phoneErrorMessage.text("Контакт с таким номером телефона уже добавлен");
            $(".phone-input-error").css({border: "1px solid red"});
        }

        return surname === "" || name === "" || phone === "" || hasGivenPhone;
    }

    function clearFormFields() {
        surnameField.val("");
        nameField.val("");
        phoneField.val("");

        $(".surname-input-error").css({border: ""});
        $(".name-input-error").css({border: ""});
        $(".phone-input-error").css({border: ""});
    }

    function addNewRecord(surname, name, phone) {
        var rowsCount = tableBody.find("tr").length;
        var newRecord = $("<tr>");
        tableBody.append(newRecord);

        newRecord.html(
            "<td class='select'><input class='selector' type='checkbox' name='row-selector'></td>" +
            "<td class='number'></td>" +
            "<td class='surname'></td>" +
            "<td class='name'></td>" +
            "<td class='phone'></td>" +
            "<td class='delete'><button type='button' class='delete-button btn btn-primary' data-bs-toggle='modal' data-bs-target='#dialog'>x</button></td>"
        );

        newRecord.find(".select").attr("value", rowsCount.toString())
        newRecord.find(".number").text((rowsCount + 1).toString())
        newRecord.find(".surname").text(surname);
        newRecord.find(".name").text(name);
        newRecord.find(".phone").text(phone);
        newRecord.find(".delete-button").click(function () {
            var handler = function () {
                newRecord.remove();
                renumberRows();
                dialog.modal('hide');
            }

            dialog.find("#yes-button").click(handler);

            dialog.on("hidden.bs.modal", function () {
                dialog.find("#yes-button").off("click", handler);
            })
        });
    }

    function renumberRows() {
        tableBody.find("tr").each(function (index) {
            var numberColumn = $(this).find(".number")
            var currentRowNumber = Number(numberColumn.text());

            if (currentRowNumber !== index + 1) {
                numberColumn.text((index + 1).toString());
            }
        });
    }

    function hasGivenPhoneNumber(phoneNumber) {
        var hasPhone = false;

        tableBody.find(".phone").each(function () {
            if ($(this).text() === phoneNumber) {
                hasPhone = true;

                return false;
            }
        });

        return hasPhone;
    }
});