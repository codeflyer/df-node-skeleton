DFNodeSkeleton
=======

A skeleton app for node.js

For a quick install use svn export

svn export  https://github.com/codeflyer/df-node-skeleton/trunk DestFolder

Edit config:

default.js

 - appName
 - server
 - mongodb.db

Edit production and stage environment in config.

copy runner from config/starters

```
cp config/starters/runStage.sh run.sh
chmod 755 run.sh
```

```
npm install

grunt firstInit

grunt test

./run.sh
```

