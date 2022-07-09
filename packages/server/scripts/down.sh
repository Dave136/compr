#!/bin/bash

NAME="compr"

docker_ps_id=($(docker ps | grep "$NAME"))

stop_docker() {
  echo "+ Stopping docker instance"
  sleep 3
  docker stop $docker_ps_id
  echo "+ Docker is stopped"
}

if [[ -z "$docker_ps_id" ]]; then
  sleep 2
  echo "+ No image docker running"
else
  stop_docker
fi
