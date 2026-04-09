#!/bin/bash

echo "Starting system test"

./scripts/seed-data.sh
./scripts/create-topics.sh

k6 run load-tests/scenarios/call-flow.js &

sleep 60

./load-tests/failures/kafka-outage.sh &
./load-tests/failures/redis-outage.sh &
./load-tests/failures/service-kill.sh &

wait