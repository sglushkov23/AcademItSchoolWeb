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

        var surname = surnameField.val().trim();
        var name = nameField.val().trim();
        var phone = phoneField.val().trim();

        if (isInvalidForm(surname, name, phone)) {
            surnameField.change(function () {
                if (surnameField.val().trim() !== "") {
                    surnameField.removeClass("input-error");
                    surnameErrorMessage.text("");
                }
            });

            nameField.change(function () {
                if (nameField.val().trim() !== "") {
                    nameField.removeClass("input-error");
                    nameErrorMessage.text("");
                }
            });

            phoneField.change(function () {
                var phoneCorrected = phoneField.val().trim();

                if (phoneCorrected !== "" && !hasGivenPhoneNumber(phoneCorrected)) {
                    phoneField.removeClass("input-error");
                    phoneErrorMessage.text("");
                } else if (phoneCorrected !== "" && hasGivenPhoneNumber(phoneCorrected)) {
                    phoneField.addClass("input-error");
                    phoneErrorMessage.text("Контакт с таким номером телефона уже добавлен");
                }
            });

            return;
        }

        clearFormFields();
        addNewRecord(surname, name, phone);
    });

    deleteSelectedRowsButton.click(function () {
        $("#dialog > p").text("Вы уверены, что хотите удалить выделенные записи?");

        $(function () {
            $("#dialog").dialog({
                modal: true,
                buttons: [
                    {
                        text: "Да", click: function () {
                            tableBody.find("tr:has(:checked)").remove();
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

    allRowsSelector.change(function () {
        $(".selector").prop("checked", this.checked);
    });

    function isInvalidForm(surname, name, phone) {
        if (surname === "") {
            surnameField.val("");
            surnameField.addClass("input-error");
            surnameErrorMessage.text("Пожалуйста, введите фамилию");
        }

        if (name === "") {
            nameField.val("");
            nameField.addClass("input-error");
            nameErrorMessage.text("Пожалуйста, введите имя");
        }

        if (phone === "") {
            phoneField.val("");
            phoneField.addClass("input-error");
            phoneErrorMessage.text("Пожалуйста, введите номер телефона");
        }

        var hasGivenPhone = hasGivenPhoneNumber(phone);

        if (hasGivenPhone) {
            phoneField.addClass("input-error");
            phoneErrorMessage.text("Контакт с таким номером телефона уже добавлен");
        }

        return surname === "" || name === "" || phone === "" || hasGivenPhone;
    }

    function clearFormFields() {
        surnameField.val("");
        nameField.val("");
        phoneField.val("");
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
            $("#dialog > p").text("Вы уверены, что хотите удалить выбранную запись?");

            $(function () {
                $("#dialog").dialog({
                    modal: true,
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