"use strict";

Vue.component("todo-list-item", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            isEditing: false,
            editText: "",
            editedItemValidity: ""
        };
    },

    template: "#todo-list-item-template",

    methods: {
        editItem: function () {
            this.editText = this.item.text;
            this.isEditing = true;
        },

        saveEditedItem: function () {
            this.editedItemValidity = "";

            if (this.editText === "") {
                this.editedItemValidity = "is-invalid";
                this.editText = "";

                return;
            }

            this.isEditing = false;
            this.$emit("save-item", this.item, this.editText);
        },

        checkEditedItemValidity: function () {
            if (this.editText !== "") {
                this.editedItemValidity = "is-valid";
            } else {
                this.editedItemValidity = "is-invalid";
            }
        },

        cancelEditing: function () {
            this.editedItemValidity = "";
            this.isEditing = false;
            this.editText = this.item.text;
        },

        deleteItem: function () {
            this.$emit("delete-item", this.item);
        }
    }
});

Vue.component("todo-list", {
    data: function () {
        return {
            items: [], // {id, text}
            newTodoItem: "",
            newItemId: 1,
            itemValidity: ""
        };
    },

    template: "#todo-list-template",

    methods: {
        addNewItem: function () {
            this.itemValidity = "";
            var text = this.newTodoItem;

            if (text === "") {
                this.itemValidity = "is-invalid";
                this.newTodoItem = "";

                return;
            }

            this.items.push({
                id: this.newItemId,
                text: text,
            });

            this.newTodoItem = "";
            this.newItemId++;
        },

        checkItemValidity: function () {
            if (this.newTodoItem !== "") {
                this.itemValidity = "is-valid";
            } else {
                this.itemValidity = "is-invalid";
            }
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        },

        saveEditedItem: function (item, editText) {
            item.text = editText;
        }
    }
});

new Vue({el: "#app"});