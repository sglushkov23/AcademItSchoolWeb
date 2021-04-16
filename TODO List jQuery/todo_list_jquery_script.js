"use strict";

$(function () {
    var newTodoTextField = $("#new-note-text-field");
    var addButton = $("#add-button");
    var list = $("#list");
    var errorMessage = $("#error-message");

    addButton.click(function () {
        var text = newTodoTextField.val();

        if (text === "") {
            errorMessage.text("Please enter text");

            return;
        }

        function showAndEditListItem() {
            errorMessage.text("");
            listItem.html("<span class='text'></span>" +
                "<button class='edit-button' type='button'>Edit</button>" +
                "<button class='delete-button' type='button'>Delete</button>");

            listItem.find(".text").text(text);
            newTodoTextField.val("");

            listItem.find(".delete-button").click(function () {
                listItem.remove();
            });

            listItem.find(".edit-button").click(function () {
                listItem.html("<input class='new-text' type='text'>" +
                    "<button class='cancel-button' type='button'>Cancel</button>" +
                    "<button class='save-button' type='button'>Save</button>" +
                    "<div class='prompt'></div>");

                listItem.find(".cancel-button").click(function () {
                    showAndEditListItem();
                });

                listItem.find('.save-button').click(function () {
                    var newText = listItem.find(".new-text").val();
                    var promptMessage = listItem.find(".prompt");

                    if (newText === "") {
                        promptMessage.text("Please enter text or press Cancel.");

                        return;
                    }

                    if (newText === text) {
                        promptMessage.text("You did not change the text. Please enter new text or press Cancel.");

                        return;
                    }

                    promptMessage.text("");
                    text = newText;
                    showAndEditListItem();
                });
            });
        }

        var listItem = $("<li>");
        list.append(listItem);
        showAndEditListItem();
    })
});