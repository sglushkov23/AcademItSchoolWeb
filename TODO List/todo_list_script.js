"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var newTodoTextField = document.getElementById("new-note-text-field");
    var addButton = document.getElementById("add-button");
    var list = document.getElementById("list");
    var errorMessage = document.getElementById("error-message");

    addButton.addEventListener("click", function () {
        var text = newTodoTextField.value.trim();

        if (text === "") {
            newTodoTextField.value = "";
            errorMessage.textContent = "Please enter text";

            return;
        }

        function showAndEditListItem() {
            errorMessage.textContent = "";
            listItem.innerHTML = "<span class='text'></span>" +
                "<button class='edit-button' type='button'>Edit</button>" +
                "<button class='delete-button' type='button'>Delete</button>";

            listItem.querySelector(".text").textContent = text;
            newTodoTextField.value = "";

            listItem.querySelector(".delete-button").addEventListener("click", function () {
                listItem.parentNode.removeChild(listItem);
            });

            listItem.querySelector(".edit-button").addEventListener("click", function () {
                listItem.innerHTML = "<input class='new-text' type='text'>" +
                    "<button class='cancel-button' type='button'>Cancel</button>" +
                    "<button class='save-button' type='button'>Save</button>" +
                    "<div class='prompt'></div>";

                listItem.querySelector(".new-text").value = text;

                listItem.querySelector(".cancel-button").addEventListener("click", function () {
                    showAndEditListItem();
                });

                listItem.querySelector('.save-button').addEventListener("click", function () {
                    var newText = listItem.querySelector(".new-text").value.trim();
                    var promptMessage = listItem.querySelector(".prompt");

                    if (newText === "") {
                        listItem.querySelector(".new-text").value = "";
                        promptMessage.textContent = "Please enter text or press Cancel.";

                        return;
                    }

                    promptMessage.textContent = "";
                    text = newText;
                    showAndEditListItem();
                });
            });
        }

        var listItem = document.createElement("li");
        list.appendChild(listItem);
        showAndEditListItem();
    });
});