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
            isEmptyEditText: false
        };
    },

    template: "#todo-list-item-template",

    methods: {
        editItem: function () {
            this.editText = this.item.text;
            this.isEditing = true;
        },

        saveEditedItem: function () {
            this.isEmptyEditText = false;

            if (this.editText.trim() === "") {
                this.isEmptyEditText = true;
                this.editText = "";

                return;
            }

            this.isEditing = false;
            this.$emit("save-item", this.item, this.editText);
        },

        cancelEditing: function () {
            this.isEmptyEditText = false;
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
            isEmptyText: false
        };
    },

    template: "#todo-list-template",

    methods: {
        addNewItem: function () {
            this.isEmptyText = false;
            var text = this.newTodoItem.trim();

            if (text === "") {
                this.isEmptyText = true;
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