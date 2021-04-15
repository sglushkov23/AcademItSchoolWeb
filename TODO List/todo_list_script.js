"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var newTodoTextField = document.getElementById("new-note-text-field");
    var addButton = document.getElementById("add-button");
    var list = document.getElementById("list");
    var errorMessage = document.getElementById("error-message");

    addButton.addEventListener("click", function () {
        var text = newTodoTextField.value;

        if (text === "") {
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
                console.log("delete handler call");
                listItem.parentNode.removeChild(listItem);
            });

            listItem.querySelector(".edit-button").addEventListener("click", function () {
                listItem.innerHTML = "<input class='new-text' type='text'>" +
                    "<button class='cancel-button' type='button'>Cancel</button>" +
                    "<button class='save-button' type='button'>Save</button>" +
                    "<div class='prompt'></div>";

                listItem.querySelector(".cancel-button").addEventListener("click", function () {
                    showAndEditListItem();
                });

                listItem.querySelector('.save-button').addEventListener("click", function () {
                    var newText = listItem.querySelector(".new-text").value;
                    var promptMessage = listItem.querySelector(".prompt");

                    if (newText === ""){
                        promptMessage.textContent = "Please enter text or press Cancel.";

                        return;
                    }

                    if (newText === text) {
                        promptMessage.textContent = "You did not change the text. Please enter new text or press Cancel.";

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
    })
});