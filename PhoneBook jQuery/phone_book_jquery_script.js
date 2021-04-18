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

    addButton.click(function (e) {
        e.preventDefault();

        var surname = surnameField.val();
        var name = nameField.val();
        var phone = phoneField.val();

        if (isInvalidForm(surname, name, phone)) {
            return;
        }

        clearFormFields();
        addNewRecord(surname, name, phone);
    });

    deleteSelectedRowsButton.click(function () {
        tableBody.find("tr").filter(function () {
            return $(this).find(":checked").length !== 0;
        }).remove();

        renumberRows();
    });

    allRowsSelector.change(function () {
        if (this.checked) {
            $(".selector").each(function () {
                $(this).prop("checked", true);
            });
        } else {
            $(".selector").each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    function isInvalidForm(surname, name, phone) {
        surnameErrorMessage.text("");
        nameErrorMessage.text("");
        phoneErrorMessage.text("");

        if (surname === "") {
            surnameErrorMessage.text("Пожалуйста, введите фамилию");
            surnameField.css({border: "1px solid red"})
        }

        if (name === "") {
            nameErrorMessage.text("Пожалуйста, введите имя");
            nameField.css({border: "1px solid red"})
        }

        if (phone === "") {
            phoneErrorMessage.text("Пожалуйста, введите номер телефона");
            phoneField.css({border: "1px solid red"})
        }

        var hasGivenPhone = hasGivenPhoneNumber(phone);

        if (hasGivenPhone) {
            phoneErrorMessage.text("Контакт с таким номером телефона уже добавлен");
        }

        return surname === "" || name === "" || phone === "" || hasGivenPhone;
    }

    function clearFormFields() {
        surnameField.val("");
        nameField.val("");
        phoneField.val("");

        surnameField.css({border: ""})
        nameField.css({border: ""})
        phoneField.css({border: ""})
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
            "<td class='delete'><button class='delete-button' type='button'>x</button></td>"
        );

        newRecord.find(".select").attr("value", rowsCount.toString())
        newRecord.find(".number").text((rowsCount + 1).toString())
        newRecord.find(".surname").text(surname);
        newRecord.find(".name").text(name);
        newRecord.find(".phone").text(phone);
        newRecord.find(".delete-button").click(function () {
            $(function () {
                $("#dialog").dialog({
                    buttons: [
                        {
                            text: "Да", click: function () {
                                newRecord.remove();
                                renumberRows();
                                $(this).dialog("close");
                            }
                        },
                        {
                            text: "Нет", click: function () {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });
            });
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