#!/bin/bash

clear

echo "Starting Test Script"

webdriver-manager start &

python -m SimpleHTTPServer &

sleep 2

protractor test/protractor-conf.js
