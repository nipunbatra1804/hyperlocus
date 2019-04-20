#!/bin/bash

npm install pm2 -g
npm install --prefix ./server
npm install --prefix ./client
npm install  --prefix ./client --save @babel/runtime
pm2 start