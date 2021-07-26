import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";

import "../scss/style.scss";

import App from "./App.vue"

new Vue({
    render: createElement => createElement(App)
}).$mount("#app");