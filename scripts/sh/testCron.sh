#!/bin/bash
my_dir="$(dirname "$0")"
source "$my_dir/nodePath.sh"

cd $WORKPATH
NODE_PATH=$WORKPATH NODE_ENV=$NODE_ENVIRONMENT NODE_APP_INSTANCE=cli $NODE_EXE_PATH $WORKPATH/scripts/testCron.js

