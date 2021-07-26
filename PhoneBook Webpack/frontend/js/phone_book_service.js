import {get, post} from "./ajax"

export default class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/";
    }

    getRecords(searchText) {
        return get(this.baseUrl + "getRecords", {searchText});
    }

    createRecord(record) {
        return post(this.baseUrl + "createRecord", {record});
    }

    deleteRecords(ids) {
        return post(this.baseUrl + "deleteRecords", {ids});
    }
}