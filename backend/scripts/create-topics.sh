#!/bin/bash

docker exec kafka kafka-topics --create \
--topic call_events \
--bootstrap-server kafka:9092 \
--partitions 3 \
--replication-factor 1 || true

docker exec kafka kafka-topics --create \
--topic billing_events \
--bootstrap-server kafka:9092 \
--partitions 3 \
--replication-factor 1 || true