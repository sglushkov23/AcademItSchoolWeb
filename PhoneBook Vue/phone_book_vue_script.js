"use strict";

Vue.component("record-creation-form", {
    props: {
        hasGivenPhoneNumber: {
            type: Boolean,
            required: true
        }
    },

    data: function () {
        return {
            surname: "",
            name: "",
            phone: "",
            newRecordId: 0,
            surnameValidity: "",
            nameValidity: "",
            phoneValidity: "",
            phoneErrorMessage: "abc"
        };
    },

    template: "#record-creation-form-template",

    methods: {
        addNewRecord: function () {
            if (this.isInvalidRecord()) {
                return;
            }

            this.$emit("add-new-record", {
                id: this.newRecordId,
                number: this.newRecordId + 1,
                checked: false,
                surname: this.surname,
                name: this.name,
                phone: this.phone
            });

            this.clearForm();
        },

        isInvalidRecord: function () {
            this.checkSurnameValidity();
            this.checkNameValidity();
            this.checkPhoneValidity();

            return this.surname === "" || this.name === "" || this.phone === "" || this.hasGivenPhoneNumber;
        },

        checkSurnameValidity: function () {
            if (this.surname !== "") {
                this.surnameValidity = "is-valid";
            } else {
                this.surnameValidity = "is-invalid";
            }
        },

        checkNameValidity: function () {
            if (this.name !== "") {
                this.nameValidity = "is-valid";
            } else {
                this.nameValidity = "is-invalid";
            }
        },

        checkPhoneValidity: function () {
            if (this.phone === "") {
                this.phoneValidity = "is-invalid";
                this.phoneErrorMessage = "Пожалуйста, введите номер телефона.";
            } else {
                this.phoneValidity = "is-valid";
                this.phoneErrorMessage = "";
                this.$emit("need-check-phone", this.phone)
            }
        },

        clearForm: function () {
            this.newRecordId++;
            this.surname = "";
            this.name = "";
            this.phone = "";
            this.surnameValidity = "";
            this.nameValidity = "";
            this.phoneValidity = "";
            this.$emit("need-check-phone", "");
        }
    },

    watch: {
        hasGivenPhoneNumber: function () {
            if (this.hasGivenPhoneNumber) {
                this.phoneValidity = "is-invalid";
                this.phoneErrorMessage = "Контакт с таким номером телефона уже добавлен.";
            } else {
                this.phoneValidity = "is-valid";
                this.phoneErrorMessage = "";
            }
        }
    }
});

Vue.component("records-table", {
    props: {
        record: {
            type: Object,
            required: true
        },

        phoneNumber: {
            type: String,
            required: true
        }
    },

    data: function () {
        return {
            records: [], // {id, surname, name, phone}
            filteredRecords: [],
            isSelectedAllRecords: false,
            hasGivenPhoneNumber: false,
            searchText: "",
            recordIdToRemove: -1,
            dialogMessage: "Вы действительно хотите удалить выделенные записи?"
        };
    },

    watch: {
        record: function () {
            this.records.push(this.record);
            this.renumberRecords();
            this.filterRecords();
        },

        phoneNumber: function () {
            if (this.phoneNumber === "") {
                return;
            }

            var phone = this.phoneNumber

            this.hasGivenPhoneNumber = this.records.some(function (e) {
                return e.phone === phone;
            });

            this.$emit("phone-checked", this.hasGivenPhoneNumber);
        },

        recordIdToRemove: function () {
            this.dialogMessage = this.recordIdToRemove === -1 ?
                "Вы действительно хотите удалить выделенные записи?" :
                "Вы действительно хотите удалить выбранную запись?";
        }
    },

    methods: {
        filterRecords: function () {
            if (this.searchText.length === 0) {
                this.filteredRecords = this.records;

                return;
            }

            var text = this.searchText.toUpperCase();

            this.filteredRecords = this.records.filter(function (e) {
                return e.surname.toUpperCase().indexOf(text) >= 0 ||
                    e.name.toUpperCase().indexOf(text) >= 0 ||
                    e.phone.toUpperCase().indexOf(text) >= 0;
            });
        },

        resetFilter: function () {
            this.searchText = "";
            this.filterRecords();
        },

        setRecordIdToRemove: function (recordId) {
            this.recordIdToRemove = recordId;
        },

        resetRecordIdToRemove: function () {
            this.recordIdToRemove = -1;
        },

        deleteRecord: function () {
            if (this.recordIdToRemove === -1) {
                return;
            }

            var recordId = this.recordIdToRemove;

            this.records = this.records.filter(function (e) {
                return e.id !== recordId;
            });

            this.filterRecords();
            this.recordIdToRemove = -1;
        },

        selectAllRecords: function () {
            var isSelected = this.isSelectedAllRecords;

            this.records.forEach(function (e) {
                e.checked = isSelected;
            });
        },

        deleteSelectedRecords: function () {
            if (this.recordIdToRemove === -1) {
                this.records = this.records.filter(function (e) {
                    return !e.checked;
                });

                this.renumberRecords();
                this.filterRecords();

                return;
            }

            var recordId = this.recordIdToRemove;

            this.records = this.records.filter(function (e) {
                return e.id !== recordId;
            });

            this.renumberRecords();
            this.filterRecords();
            this.recordIdToRemove = -1;
        },

        renumberRecords: function () {
            var currentRecordNumber = 1;

            this.records.forEach(function (e) {
                e.number = currentRecordNumber;
                currentRecordNumber++;
            });
        }
    },

    template: "#records-table-template",
})

Vue.component("record", {
    props: {
        record: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            id: this.record.id,
            number: this.record.number,
            checked: this.record.checked,
            surname: this.record.surname,
            name: this.record.name,
            phone: this.record.phone
        }
    },

    methods: {
        deleteRecord: function () {
            this.$emit("delete-record", this.id);
        }
    },

    template: "#record-template"
});

new Vue({
    el: "#app",

    data: {
        newRecord: {},
        phoneNumberToCheck: "",
        hasGivenPhoneNumber: null
    },

    methods: {
        addNewRecord: function (record) {
            this.newRecord = record;
        },

        savePhoneNumberToCheck: function (phoneNumber) {
            this.phoneNumberToCheck = phoneNumber;
        },

        savePhoneCheckResult: function (hasGivenPhoneNumber) {
            this.hasGivenPhoneNumber = hasGivenPhoneNumber;
        }
    }
});