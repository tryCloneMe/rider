#!/bin/bash

cd frontend
npm run build
cd ..
git add .
git commit -m "build"
git push
sshcmd="ssh -t -i "KeyPair.pem" ec2-user@ec2-13-126-227-36.ap-south-1.compute.amazonaws.com"
$sshcmd screen -S "deployment" /home/ec2-user/rider/production.sh
