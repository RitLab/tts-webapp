# TextToSpeechApi.DefaultApi

All URIs are relative to *https://localhost:7075*

Method | HTTP request | Description
------------- | ------------- | -------------
[**joinMP3Files**](DefaultApi.md#joinMP3Files) | **POST** /api/tts/join | Join mp3 file into one file
[**readTextToSpeech**](DefaultApi.md#readTextToSpeech) | **POST** /api/tts/read | Convert text to speech and response with sound
[**textToSpeech**](DefaultApi.md#textToSpeech) | **POST** /api/tts | Convert text to speech



## joinMP3Files

> TtsResponse joinMP3Files(files)

Join mp3 file into one file

### Example

```javascript
import TextToSpeechApi from 'text_to_speech_api';

let apiInstance = new TextToSpeechApi.DefaultApi();
let files = ["null"]; // [File] | 
apiInstance.joinMP3Files(files, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **files** | **[File]**|  | 

### Return type

[**TtsResponse**](TtsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## readTextToSpeech

> Success readTextToSpeech(ttsRequest)

Convert text to speech and response with sound

### Example

```javascript
import TextToSpeechApi from 'text_to_speech_api';

let apiInstance = new TextToSpeechApi.DefaultApi();
let ttsRequest = new TextToSpeechApi.TtsRequest(); // TtsRequest | Text input for conversion with sound
apiInstance.readTextToSpeech(ttsRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ttsRequest** | [**TtsRequest**](TtsRequest.md)| Text input for conversion with sound | 

### Return type

[**Success**](Success.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## textToSpeech

> TtsResponse textToSpeech(ttsRequest)

Convert text to speech

### Example

```javascript
import TextToSpeechApi from 'text_to_speech_api';

let apiInstance = new TextToSpeechApi.DefaultApi();
let ttsRequest = new TextToSpeechApi.TtsRequest(); // TtsRequest | Text input for conversion
apiInstance.textToSpeech(ttsRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ttsRequest** | [**TtsRequest**](TtsRequest.md)| Text input for conversion | 

### Return type

[**TtsResponse**](TtsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

