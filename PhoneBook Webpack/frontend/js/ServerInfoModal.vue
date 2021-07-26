<template>
    <div class="modal" :class="shownDialog" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Сообщение сервера</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="closeButtonClicked">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ infoMessage }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                            @click="okButtonClicked">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shownDialog: {
            type: String,
            required: true
        },

        infoMessage: {
            type: String,
            required: true
        }
    },

    methods: {
        closeButtonClicked() {
            this.$emit("close-button-clicked"); // -> resetShownDialog() in App.vue
        },

        okButtonClicked() {
            this.$emit("ok-button-clicked"); // -> resetShownDialog() in App.vue
        }
    }
}
</script>