<template>
    <tr>
        <td class="align-middle">
            <label class="my-0">
                <input class="selector" type="checkbox" name="row-selector" v-model="record.checked"
                       @change="selectRecord">
            </label>
        </td>
        <td class="align-middle">{{ record.number }}</td>
        <td class="align-middle">{{ record.surname }}</td>
        <td class="align-middle">{{ record.name }}</td>
        <td class="align-middle">{{ record.phone }}</td>
        <td class="align-middle">
            <button type="button"
                    class="delete-button btn btn-primary"
                    data-toggle="modal"
                    data-target="#dialog"
                    @click="deleteRecord">x
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        record: {
            type: Object,
            required: true
        }
    },

    data() {
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
        deleteRecord() {
            this.$emit("delete-record", this.id);
        },

        selectRecord() {
            this.$emit("select-record");
        }
    }
}
</script>