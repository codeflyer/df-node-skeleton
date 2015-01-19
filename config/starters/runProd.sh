#!/bin/sh
FOREVER_PATH=/usr/local/bin/forever
WORKPATH=/apps/pathToApp

NODE_CONFIG_DIR=$WORKPATH/config NODE_PATH=$WORKPATH NODE_ENV=production $FOREVER_PATH start --workingDir $WORKPATH -o $WORKPATH/logs/out.log -e $WORKPATH/logs/err.log -l $WORKPATH/logs/logs.log -a $WORKPATH/app.js
