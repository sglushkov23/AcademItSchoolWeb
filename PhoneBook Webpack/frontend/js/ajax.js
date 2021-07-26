import $ from "jquery";

export function get(url, data) {
    return $.get(url, data);
}

export function post(url, data) {
    return $.post({
        url,
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}