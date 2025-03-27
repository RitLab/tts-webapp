.PHONY: openapi
openapi: openapi_js

.PHONY: openapi_js
openapi_js:
	@./scripts/openapi-js.sh tts
	@./scripts/openapi-js.sh support
	@./scripts/openapi-js.sh pdf

.PHONY: build
build:
	docker build --no-cache --progress=plain -t ritlab/tts-app:dev -f docker/web-app/Dockerfile \
	.