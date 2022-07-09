#!/bin/bash

NAME="compr"

docker_ps_id=($(docker ps | grep "$NAME"))

start_docker() {
  echo "+ Starting docker instance"
  sleep 3
  docker compose up -d
  echo "+ Docker image is running"
}

restart_docker() {
  echo "+ Stopping docker instance..."
  sleep 3
  docker stop $docker_ps_id
  echo "+ Starting docker instance again..."
  sleep 3
  docker compose up -d
  echo "+ Docker image running"
}

if [[ -z "$docker_ps_id" ]]; then
  start_docker
else
  restart_docker
fi
