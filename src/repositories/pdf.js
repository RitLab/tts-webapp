import {PUBLIC_API_BASE_URL} from "$env/static/public";
import {ApiClient} from "./clients/pdf/src";
import DefaultApi from "./clients/pdf/src/api/DefaultApi";

export let pdfClient = new ApiClient();
pdfClient.basePath = PUBLIC_API_BASE_URL;
pdfClient.defaultHeaders = {};
let pdfApi = new DefaultApi(pdfClient);

export function JoinPdfFiles(files, errorCallback, callback) {
    pdfApi.joinPdfFiles(files, (err, result) => {
        if (err) {
            errorCallback(err);
        } else {
            callback(result);
        }
    })
}

export function SignPdfFile(file, key,errorCallback, callback) {
    pdfApi.signPdfFile(file, key,(err, result) => {
        if (err) {
            errorCallback(err);
        } else {
            callback(result);
        }
    })
}

export function VerifyPdfFile(file, key,errorCallback, callback) {
    pdfApi.verifyPdfFile(file, key,(err, result) => {
        if (err) {
            errorCallback(err);
        } else {
            callback(result);
        }
    })
}

export function SummarizePdf(file,errorCallback, callback) {
    pdfApi.summarizePdf(file,(err, result) => {
        if (err) {
            errorCallback(err);
        } else {
            callback(result);
        }
    })
}