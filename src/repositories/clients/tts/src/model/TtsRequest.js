/**
 * Text-to-Speech API
 * A simple API for converting text to speech.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: ritlabs1404@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The TtsRequest model module.
 * @module model/TtsRequest
 * @version 1.0.0
 */
class TtsRequest {
    /**
     * Constructs a new <code>TtsRequest</code>.
     * @alias module:model/TtsRequest
     * @param text {String} 
     */
    constructor(text) { 
        
        TtsRequest.initialize(this, text);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, text) { 
        obj['text'] = text;
        obj['lang'] = 'id';
    }

    /**
     * Constructs a <code>TtsRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TtsRequest} obj Optional instance to populate.
     * @return {module:model/TtsRequest} The populated <code>TtsRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TtsRequest();

            if (data.hasOwnProperty('text')) {
                obj['text'] = ApiClient.convertToType(data['text'], 'String');
            }
            if (data.hasOwnProperty('lang')) {
                obj['lang'] = ApiClient.convertToType(data['lang'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TtsRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TtsRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of TtsRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['text'] && !(typeof data['text'] === 'string' || data['text'] instanceof String)) {
            throw new Error("Expected the field `text` to be a primitive type in the JSON string but got " + data['text']);
        }
        // ensure the json data is a string
        if (data['lang'] && !(typeof data['lang'] === 'string' || data['lang'] instanceof String)) {
            throw new Error("Expected the field `lang` to be a primitive type in the JSON string but got " + data['lang']);
        }

        return true;
    }


}

TtsRequest.RequiredProperties = ["text"];

/**
 * @member {String} text
 */
TtsRequest.prototype['text'] = undefined;

/**
 * Language code for the speech (e.g., \"en\" for English, \"id\" for Indonesian).
 * @member {String} lang
 * @default 'id'
 */
TtsRequest.prototype['lang'] = 'id';






export default TtsRequest;

