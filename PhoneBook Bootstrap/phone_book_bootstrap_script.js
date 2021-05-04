"use strict";

$(function () {
    var surnameField = $("#surname");
    var nameField = $("#name");
    var phoneField = $("#phone");
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
            surnameField.on("input", function () {
                if (surnameField.val().trim() !== "") {
                    surnameField.removeClass("is-invalid");
                    surnameField.addClass("is-valid");
                } else {
                    surnameField.addClass("is-invalid");
                    surnameField.removeClass("is-valid");
                }
            });

            nameField.on("input", function () {
                if (nameField.val().trim() !== "") {
                    nameField.removeClass("is-invalid");
                    nameField.addClass("is-valid");
                } else {
                    nameField.addClass("is-invalid");
                    nameField.removeClass("is-valid");
                }
            });

            phoneField.on("input", function () {
                var phoneCorrected = phoneField.val().trim();

                if (phoneCorrected === "") {
                    phoneField.addClass("is-invalid");
                    $("div:has(#phone) > .invalid-feedback").text("Пожалуйста, введите номер телефона.");
                } else {
                    if (!hasGivenPhoneNumber(phoneCorrected)) {
                        phoneField.removeClass("is-invalid");
                        phoneField.addClass("is-valid");
                        $("div:has(#phone) > .invalid-feedback").text("");
                    } else {
                        phoneField.addClass("is-invalid");
                        $("div:has(#phone) > .invalid-feedback").text("Контакт с таким номером телефона уже добавлен.");
                    }
                }
            });

            return;
        }

        clearFormFields();
        addNewRecord(surname, name, phone);
    });

    deleteSelectedRowsButton.click(function (e) {
        var recordsToRemove = tableBody.find("tr:has(:checked)");

        if (recordsToRemove.length === 0) {
            e.stopPropagation();

            return;
        }

        $("#dialog .modal-body").text("Вы уверены, что хотите удалить выделенные записи?");

        dialog.find("#yes-button").click(function () {
            recordsToRemove.remove();
            renumberRows();
            dialog.modal("hide");
        });
    });

    allRowsSelector.change(function () {
        $(".selector").prop("checked", this.checked);
    });

    function isInvalidForm(surname, name, phone) {
        if (surname === "") {
            surnameField.val("");
            surnameField.addClass("is-invalid");
        }

        if (name === "") {
            nameField.val("");
            nameField.addClass("is-invalid");
        }

        if (phone === "") {
            phoneField.val("");
            phoneField.addClass("is-invalid");
            $("div:has(#phone) > .invalid-feedback").text("Пожалуйста, введите номер телефона.");
        }

        var hasGivenPhone = hasGivenPhoneNumber(phone);

        if (hasGivenPhone) {
            phoneField.addClass("is-invalid");
            $("div:has(#phone) > .invalid-feedback").text("Контакт с таким номером телефона уже добавлен.");
        }

        return surname === "" || name === "" || phone === "" || hasGivenPhone;
    }

    function clearFormFields() {
        surnameField.val("");
        nameField.val("");
        phoneField.val("");

        surnameField.removeClass("is-valid");
        nameField.removeClass("is-valid");
        phoneField.removeClass("is-valid");
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
            "<td class='delete'><button type='button' class='delete-button btn btn-primary' data-toggle='modal' data-target='#dialog'>x</button></td>"
        );

        newRecord.find(".select").attr("value", rowsCount.toString())
        newRecord.find(".number").text((rowsCount + 1).toString())
        newRecord.find(".surname").text(surname);
        newRecord.find(".name").text(name);
        newRecord.find(".phone").text(phone);
        newRecord.find(".delete-button").click(function () {
            $("#dialog .modal-body").text("Вы уверены, что хотите удалить выбранную запись?");

            var handler = function () {
                newRecord.remove();
                renumberRows();
                dialog.modal("hide");
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