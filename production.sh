#!/bin/bash
SECONDS=0

cd $HOME/rider

msg () {
  echo -e "$1\n--------------------\n"
}

msg "Pulling from GitHub"
git pull

msg "Building Docker image"
sudo docker build -t rider .

msg "Stopping Docker container"
sudo docker stop rider
sudo docker rm rider

msg "Starting Docker container"
sudo docker run -d -p 8080:8080 rider

msg "Starting Postgres container"
sudo docker run -d \
--name db-postgres \
-p 5432:5432 \
--mount type=volume,src=rider-db,target=/var/lib/postgresql/data \
-e POSTGRES_PASSWORD=postgres \
postgres:15.1-alpine

msg "Pruning stale Docker images"
sudo docker image prune -f

duration=$SECONDS

echo
msg "Deploy finished in $(($duration % 60)) seconds."
msg "Press Enter to exit"
read
