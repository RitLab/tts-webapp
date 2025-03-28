/**
 * PDF API
 * A simple API for processing PDF.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: ritlabs1404@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Error from '../model/Error';
import Success from '../model/Success';
import SummarizeResponse from '../model/SummarizeResponse';
import TtsResponse from '../model/TtsResponse';

/**
* Default service.
* @module api/DefaultApi
* @version 1.0.0
*/
export default class DefaultApi {

    /**
    * Constructs a new DefaultApi. 
    * @alias module:api/DefaultApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the joinPdfFiles operation.
     * @callback module:api/DefaultApi~joinPdfFilesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TtsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Join pdf file into one file
     * @param {Array.<File>} files 
     * @param {module:api/DefaultApi~joinPdfFilesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TtsResponse}
     */
    joinPdfFiles(files, callback) {
      let postBody = null;
      // verify the required parameter 'files' is set
      if (files === undefined || files === null) {
        throw new Error("Missing the required parameter 'files' when calling joinPdfFiles");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'files': this.apiClient.buildCollectionParam(files, 'passthrough')
      };

      let authNames = [];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = TtsResponse;
      return this.apiClient.callApi(
        '/api/tts/join-pdf', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the signPdfFile operation.
     * @callback module:api/DefaultApi~signPdfFileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TtsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sign pdf file
     * @param {File} file 
     * @param {String} key 
     * @param {module:api/DefaultApi~signPdfFileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TtsResponse}
     */
    signPdfFile(file, key, callback) {
      let postBody = null;
      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling signPdfFile");
      }
      // verify the required parameter 'key' is set
      if (key === undefined || key === null) {
        throw new Error("Missing the required parameter 'key' when calling signPdfFile");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file,
        'key': key
      };

      let authNames = [];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = TtsResponse;
      return this.apiClient.callApi(
        '/api/tts/sign-pdf', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the summarizePdf operation.
     * @callback module:api/DefaultApi~summarizePdfCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SummarizeResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Summarize Pdf Text
     * @param {File} file 
     * @param {module:api/DefaultApi~summarizePdfCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SummarizeResponse}
     */
    summarizePdf(file, callback) {
      let postBody = null;
      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling summarizePdf");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file
      };

      let authNames = [];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = SummarizeResponse;
      return this.apiClient.callApi(
        '/api/tts/summarize-pdf', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the verifyPdfFile operation.
     * @callback module:api/DefaultApi~verifyPdfFileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Success} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Verify pdf file
     * @param {File} file 
     * @param {String} key 
     * @param {module:api/DefaultApi~verifyPdfFileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Success}
     */
    verifyPdfFile(file, key, callback) {
      let postBody = null;
      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling verifyPdfFile");
      }
      // verify the required parameter 'key' is set
      if (key === undefined || key === null) {
        throw new Error("Missing the required parameter 'key' when calling verifyPdfFile");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file,
        'key': key
      };

      let authNames = [];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = Success;
      return this.apiClient.callApi(
        '/api/tts/verify-pdf', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
