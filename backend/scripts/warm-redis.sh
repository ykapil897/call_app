#!/bin/bash

for i in {1..1000}
do
curl -s -X POST http://localhost:3000/session/create \
-H "Authorization: Bearer testtoken" \
-d '{"deviceType":"WEB"}' >/dev/null
done