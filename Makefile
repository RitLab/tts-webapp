.PHONY: openapi
openapi: openapi_js

.PHONY: openapi_js
openapi_js:
	@./scripts/openapi-js.sh tts
	@./scripts/openapi-js.sh support