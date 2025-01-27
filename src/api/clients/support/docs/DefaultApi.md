# SupportApi.DefaultApi

All URIs are relative to *https://localhost:7075/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**insertSupport**](DefaultApi.md#insertSupport) | **POST** /api/tts/support | Insert support support API



## insertSupport

> Success insertSupport(supportRequest)

Insert support support API

### Example

```javascript
import SupportApi from 'support_api';

let apiInstance = new SupportApi.DefaultApi();
let supportRequest = new SupportApi.SupportRequest(); // SupportRequest | Insert support support API
apiInstance.insertSupport(supportRequest, (error, data, response) => {
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
 **supportRequest** | [**SupportRequest**](SupportRequest.md)| Insert support support API | 

### Return type

[**Success**](Success.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

