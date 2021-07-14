"use strict";

function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

function PhoneBookService() {
    this.baseUrl = "/api/";

    this.getRecords = function (searchText) {
        return get(this.baseUrl + "getRecords", {searchText: searchText});
    }

    this.createRecord = function (record) {
        return post(this.baseUrl + "createRecord", {record: record});
    }

    this.deleteRecords = function (ids) {
        return post(this.baseUrl + "deleteRecords", {ids: ids});
    }
}

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
            phoneErrorMessage: "",
            service: new PhoneBookService()
        };
    },

    template: "#record-creation-form-template",

    methods: {
        addNewRecord: function () {
            if (this.isInvalidRecord()) {
                return;
            }

            var self = this;
            var record = {
                surname: this.surname,
                name: this.name,
                phone: this.phone
            };

            this.service.createRecord(record).done(function (response) {
                if (!response.success) {
                    self.$emit("show-info-dialog", response.message);

                    return;
                }

                self.$emit("add-new-record");
                self.clearForm();
            }).fail(function () {
                self.$emit("show-info-dialog", "Не удалось создать запись");
            });
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
                if (this.hasGivenPhoneNumber) {
                    this.phoneValidity = "is-invalid";
                    this.phoneErrorMessage = "Контакт с таким номером телефона уже добавлен.";
                } else {
                    this.phoneValidity = "is-valid";
                    this.phoneErrorMessage = "";
                }

                this.$emit("need-check-phone", this.phone);
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
        needUpdateRecords: {
            type: Boolean,
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
            isSelectedAllRecords: false,
            hasGivenPhoneNumber: false,
            searchText: "",
            recordIdToRemove: -1,
            dialogMessage: "Вы действительно хотите удалить выделенные записи?",
            service: new PhoneBookService(),
            disabled: "disabled"
        };
    },

    watch: {
        needUpdateRecords: function () {
            if (this.needUpdateRecords) {
                this.loadRecords();
                this.$emit("records-updated");
            }
        },

        phoneNumber: function () {
            if (this.phoneNumber === "") {
                return;
            }

            var phone = this.phoneNumber;

            this.hasGivenPhoneNumber = this.records.some(function (e) {
                return e.phone === phone;
            });

            this.$emit("phone-checked", this.hasGivenPhoneNumber);
        },

        recordIdToRemove: function () {
            this.dialogMessage = this.recordIdToRemove === -1
                ? "Вы действительно хотите удалить выделенные записи?"
                : "Вы действительно хотите удалить выбранную запись?";
        }
    },

    created: function () {
        this.loadRecords();
    },

    methods: {
        loadRecords: function () {
            var self = this;

            this.service.getRecords(this.searchText).done(function (response) {
                self.records = response;
                self.renumberRecords();
            }).fail(function () {
                self.$emit("show-info-dialog", "Не удалось загрузить список записей");
            });
        },

        deleteRecords: function () {
            var idsToRemove = this.recordIdToRemove === -1
                ? this.getSelectedRecordsIds()
                : [this.recordIdToRemove];
            var self = this;

            this.service.deleteRecords(idsToRemove).done(function (response) {
                if (!response.success) {
                    self.$emit("show-info-dialog", response.message);

                    return;
                }

                self.loadRecords();
            }).fail(function () {
                self.$emit("show-info-dialog", "Не удалось удалить записи");
            });

            this.recordIdToRemove = -1;
            this.disabled = "disabled";
        },

        getSelectedRecordsIds: function () {
            return this.records.filter(function (e) {
                return e.checked;
            }).map(function (e) {
                return e.id;
            });
        },

        checkForSelectedRecords: function () {
            if (this.getSelectedRecordsIds().length > 0) {
                this.disabled = "";
            } else {
                this.disabled = "disabled";
            }
        },

        resetFilter: function () {
            this.searchText = "";
            this.loadRecords();
        },

        setRecordIdToRemove: function (recordId) {
            this.recordIdToRemove = recordId;
        },

        resetRecordIdToRemove: function () {
            this.recordIdToRemove = -1;
        },

        selectAllRecords: function () {
            var isSelected = this.isSelectedAllRecords;

            this.records.forEach(function (e) {
                Vue.set(e, "checked", false);
                e.checked = isSelected;
            });
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
        };
    },

    methods: {
        deleteRecord: function () {
            this.$emit("delete-record", this.id);
        },

        selectRecord: function () {
            this.$emit("select-record")
        }
    },

    template: "#record-template"
});

new Vue({
    el: "#app",

    data: {
        needUpdateRecords: false,
        phoneNumberToCheck: "",
        hasGivenPhoneNumber: null,
        infoMessage: "",
        shownDialog: ""
    },

    methods: {
        setNeedToUpdateFlag: function () {
            this.needUpdateRecords = true;
        },

        resetNeedToUpdateFlag: function () {
            this.needUpdateRecords = false;
        },

        savePhoneNumberToCheck: function (phoneNumber) {
            this.phoneNumberToCheck = phoneNumber;
        },

        savePhoneCheckResult: function (hasGivenPhoneNumber) {
            this.hasGivenPhoneNumber = hasGivenPhoneNumber;
        },

        showInfoDialog: function (message) {
            this.shownDialog = "shown-dialog";
            this.infoMessage = message;
        },

        resetShownDialog: function () {
            this.shownDialog = "";
            this.infoMessage = "";
        }
    }
});