<template>
    <div>
        <h1 class="header my-3">Телефонная книга</h1>

        <form class="mb-4 p-3 border needs-validation" novalidate>
            <div class="mb-3">
                <label for="surname" class="form-label">Фамилия</label>
                <input type="text" class="form-control" :class="surnameValidity" id="surname"
                       placeholder="Введите фамилию *" required
                       name="surname" v-model.trim="surname" @input="checkSurnameValidity">
                <div class="invalid-feedback">Пожалуйста, введите фамилию.</div>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Имя</label>
                <input type="text" class="form-control" :class="nameValidity" id="name" placeholder="Введите имя *"
                       required name="name"
                       v-model.trim="name" @input="checkNameValidity">
                <div class="invalid-feedback">Пожалуйста, введите имя.</div>
            </div>
            <div class="mb-4">
                <label for="phone" class="form-label">Номер телефона</label>
                <input type="text" class="form-control" :class="phoneValidity" id="phone"
                       placeholder="Введите номер телефона *" required
                       name="phone" v-model.trim="phone" @input="checkPhoneValidity">
                <div class="invalid-feedback">{{ phoneErrorMessage }}</div>
            </div>

            <button type="submit" class="btn btn-primary" id="add-button" @click.prevent="addNewRecord">Добавить
                запись
            </button>
        </form>
    </div>
</template>

<script>
import PhoneBookService from "./phone_book_service";

export default {
    props: {
        hasGivenPhoneNumber: {
            type: Boolean,
            required: true
        }
    },

    data() {
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

    methods: {
        addNewRecord() {
            if (this.isInvalidRecord()) {
                return;
            }

            const record = {
                surname: this.surname,
                name: this.name,
                phone: this.phone
            };

            this.service.createRecord(record).done(response => {
                if (!response.success) {
                    this.$emit("show-info-dialog", response.message);

                    return;
                }

                this.$emit("add-new-record");
                this.clearForm();
            }).fail(() => this.$emit("show-info-dialog", "Не удалось создать запись"));
        },

        isInvalidRecord() {
            this.checkSurnameValidity();
            this.checkNameValidity();
            this.checkPhoneValidity();

            return this.surname === "" || this.name === "" || this.phone === "" || this.hasGivenPhoneNumber;
        },

        checkSurnameValidity() {
            if (this.surname !== "") {
                this.surnameValidity = "is-valid";
            } else {
                this.surnameValidity = "is-invalid";
            }
        },

        checkNameValidity() {
            if (this.name !== "") {
                this.nameValidity = "is-valid";
            } else {
                this.nameValidity = "is-invalid";
            }
        },

        checkPhoneValidity() {
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

        clearForm() {
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
        hasGivenPhoneNumber() {
            if (this.hasGivenPhoneNumber) {
                this.phoneValidity = "is-invalid";
                this.phoneErrorMessage = "Контакт с таким номером телефона уже добавлен.";
            } else {
                this.phoneValidity = "is-valid";
                this.phoneErrorMessage = "";
            }
        }
    }
}
</script>