import {PUBLIC_API_BASE_URL} from "$env/static/public";
import ApiClient from "./clients/tts/src/ApiClient.js";
import {DefaultApi} from "./clients/tts/src/index.js";

export let ttsClient = new ApiClient();
ttsClient.basePath = PUBLIC_API_BASE_URL;
ttsClient.defaultHeaders = {};
let ttsApi = new DefaultApi(ttsClient);

export function createTTSFile(lang, text, errorCallback, callback) {
    ttsApi.textToSpeech(JSON.stringify({
        "lang": lang,
        "text": text,
    }), (err, result) => {
        if (err) {
            errorCallback(err);
        } else {
            callback(result);
        }
    })
}

export function JoinMp3Files(files, errorCallback, callback) {
    ttsApi.joinMP3Files(files, (err, result) => {
        if (err) {
            errorCallback(err);
        } else {
            callback(result);
        }
    })
}