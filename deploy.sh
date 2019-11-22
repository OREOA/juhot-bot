#!/bin/bash
set -x
ssh ubuntu@$IP <<EOF
    if [[ $TRAVIS_BRANCH = 'master' ]]
    then
        cd ~/juhot-bot
        git reset --hard HEAD
        git pull
        echo "Running npm install"
        npm install
        echo "Latest version of juhot-bot running."
    fi
EOF