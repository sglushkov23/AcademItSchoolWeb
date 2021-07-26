<template>
    <div>
        <div class="row mt-5 mb-3 no-gutters">
            <div class="col mb-2 mr-2">
                <input type="text" class="form-control" v-model="searchText" placeholder="Поиск по таблице">
            </div>
            <div class="col-auto mb-2 mr-2">
                <button type="button" class="btn btn-primary" @click="loadRecords">Найти</button>
            </div>
            <div class="col-auto mb-2">
                <button type="button" class="btn btn-secondary" @click="resetFilter">Сбросить</button>
            </div>
        </div>

        <div class="table-responsive-sm">
            <table class="table table-striped table-bordered">
                <thead class="table-dark">
                <tr>
                    <th class="align-middle">
                        <label class="my-0">
                            <input type="checkbox" name="all-rows-selector" v-model="isSelectedAllRecords"
                                   @change="selectAllRecords(), checkForSelectedRecords()">
                        </label>
                    </th>
                    <th class="align-middle">№</th>
                    <th class="align-middle">Фамилия</th>
                    <th class="align-middle">Имя</th>
                    <th class="align-middle">Номер телефона</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="table-body">
                <record
                    v-for="record in records"
                    :key="record.id"
                    :record="record"
                    @delete-record="setRecordIdToRemove"
                    @select-record="checkForSelectedRecords">
                </record>
                </tbody>
            </table>
        </div>

        <button id="delete-selected-rows-button" :class="disabled" class="btn btn-primary delete-rows-button mb-3"
                type="button"
                data-toggle="modal" data-target="#dialog">Удалить выбранное
        </button>

        <modal
            :message="dialogMessage"
            @close-button-clicked="resetRecordIdToRemove"
            @no-button-clicked="resetRecordIdToRemove"
            @yes-button-clicked="deleteRecords">
        </modal>
    </div>
</template>

<script>
import Vue from "vue";
import PhoneBookService from "./phone_book_service";
import Record from "./Record.vue"
import Modal from "./Modal.vue"

export default {
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

    data() {
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

    components: {
        "record": Record,
        "modal": Modal
    },

    watch: {
        needUpdateRecords() {
            if (this.needUpdateRecords) {
                this.loadRecords();
                this.$emit("records-updated");
            }
        },

        phoneNumber() {
            if (this.phoneNumber === "") {
                return;
            }

            const phone = this.phoneNumber;
            this.hasGivenPhoneNumber = this.records.some(e => e.phone === phone);
            this.$emit("phone-checked", this.hasGivenPhoneNumber);
        },

        recordIdToRemove() {
            this.dialogMessage = this.recordIdToRemove === -1
                ? "Вы действительно хотите удалить выделенные записи?"
                : "Вы действительно хотите удалить выбранную запись?";
        }
    },

    created() {
        this.loadRecords();
    },

    methods: {
        loadRecords() {
            this.service.getRecords(this.searchText).done(response => {
                this.records = response;
                this.renumberRecords();
            }).fail(() => this.$emit("show-info-dialog", "Не удалось загрузить список записей"));

            this.disabled = "disabled";
        },

        deleteRecords() {
            const idsToRemove = this.recordIdToRemove === -1
                ? this.getSelectedRecordsIds()
                : [this.recordIdToRemove];

            this.service.deleteRecords(idsToRemove).done(response => {
                if (!response.success) {
                    this.$emit("show-info-dialog", response.message);

                    return;
                }

                this.loadRecords();
            }).fail(() => this.$emit("show-info-dialog", "Не удалось удалить записи"));

            this.recordIdToRemove = -1;
        },

        getSelectedRecordsIds() {
            return this.records
                .filter(e => e.checked)
                .map(e => e.id);
        },

        checkForSelectedRecords() {
            if (this.getSelectedRecordsIds().length > 0) {
                this.disabled = "";

                return;
            }

            this.disabled = "disabled";
        },

        resetFilter() {
            this.searchText = "";
            this.loadRecords();
        },

        setRecordIdToRemove(recordId) {
            this.recordIdToRemove = recordId;
        },

        resetRecordIdToRemove() {
            this.recordIdToRemove = -1;
        },

        selectAllRecords() {
            const isSelected = this.isSelectedAllRecords;

            this.records.forEach(e => {
                Vue.set(e, "checked", false);
                e.checked = isSelected;
            });
        },

        renumberRecords() {
            let currentRecordNumber = 1;

            this.records.forEach(e => {
                e.number = currentRecordNumber;
                currentRecordNumber++;
            });
        }
    }
}
</script>