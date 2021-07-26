<template>
    <div v-cloak id="app">
        <div class="container">
            <record-creation-form :has-given-phone-number="hasGivenPhoneNumber"
                                  @add-new-record="setNeedToUpdateFlag"
                                  @need-check-phone="savePhoneNumberToCheck"
                                  @show-info-dialog="showInfoDialog"></record-creation-form>

            <records-table :phone-number="phoneNumberToCheck"
                           :need-update-records="needUpdateRecords"
                           @records-updated="resetNeedToUpdateFlag"
                           @phone-checked="savePhoneCheckResult"
                           @show-info-dialog="showInfoDialog"></records-table>

            <server-info-modal
                :shown-dialog="shownDialog"
                :info-message="infoMessage"
                @close-button-clicked="resetShownDialog"
                @ok-button-clicked="resetShownDialog">
            </server-info-modal>
        </div>
    </div>
</template>

<script>
import RecordsTable from "./RecordsTable.vue";
import RecordCreationForm from "./RecordCreationForm.vue";
import ServerInfoModal from "./ServerInfoModal.vue";

export default {
    data() {
        return {
            needUpdateRecords: false,
            phoneNumberToCheck: "",
            hasGivenPhoneNumber: false,
            infoMessage: "",
            shownDialog: ""
        };
    },

    components: {
        "record-creation-form": RecordCreationForm,
        "records-table": RecordsTable,
        "server-info-modal": ServerInfoModal
    },

    methods: {
        setNeedToUpdateFlag() {
            this.needUpdateRecords = true;
        },

        resetNeedToUpdateFlag() {
            this.needUpdateRecords = false;
        },

        savePhoneNumberToCheck(phoneNumber) {
            this.phoneNumberToCheck = phoneNumber;
        },

        savePhoneCheckResult(hasGivenPhoneNumber) {
            this.hasGivenPhoneNumber = hasGivenPhoneNumber;
        },

        showInfoDialog(message) {
            this.shownDialog = "shown-dialog";
            this.infoMessage = message;
        },

        resetShownDialog() {
            this.shownDialog = "";
            this.infoMessage = "";
        }
    }
}
</script>