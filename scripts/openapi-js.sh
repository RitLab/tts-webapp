#!/bin/bash
set -e

readonly service="$1"

docker run --rm --env "JAVA_OPTS=-Dlog.level=error" -v "${PWD}:/local" \
  "openapitools/openapi-generator-cli:v7.11.0" generate \
  -i "/local/api/openapi/$service.yaml" \
  -g javascript \
  -o "/local/src/repositories/clients/$service"
