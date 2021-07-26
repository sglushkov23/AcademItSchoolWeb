<template>
    <div class="modal fade" id="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Подтверждение удаления</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="closeButtonClicked">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">{{ message }}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click="noButtonClicked">Нет
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                            @click="yesButtonClicked">Да
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    },

    methods: {
        closeButtonClicked() {
            this.$emit("close-button-clicked"); // -> resetRecordIdToRemove in RecordsTable.vue
        },

        noButtonClicked() {
            this.$emit("no-button-clicked"); // -> resetRecordIdToRemove in RecordsTable.vue
        },

        yesButtonClicked() {
            this.$emit("yes-button-clicked"); // -> deleteRecords in RecordsTable.vue
        }
    }
}
</script>