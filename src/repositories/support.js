import {PUBLIC_API_BASE_URL} from "$env/static/public";
import {ApiClient} from "./clients/support/src";
import DefaultApi from "./clients/support/src/api/DefaultApi";

export let supportClient = new ApiClient()
supportClient.basePath = PUBLIC_API_BASE_URL;
supportClient.defaultHeaders = {};
let supportAPI = new DefaultApi(supportClient);

export function insertSupportData(name, email, message, errorCallback, callback) {
    supportAPI.insertSupport(JSON.stringify({
        "name": name,
        "email": email,
        "message": message,
    }), (error, data) => {
        if (error) {
            errorCallback(error);
        } else {
            callback(data)
        }
    })
}