#!/bin/bash
SECONDS=0

cd $HOME/rider

msg () {
  echo -e "$1\n--------------------\n"
}

msg "Stopping app"
sudo pkill server

msg "Pulling from GitHub"
git pull

msg "Building Go binary"
go build server.go

msg "Starting server"
nohup sudo ./server &>/dev/null &

duration=$SECONDS

echo
msg "Deploy finished in $(($duration % 60)) seconds."
msg "Press Enter to exit"
read