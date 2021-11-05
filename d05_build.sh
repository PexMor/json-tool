#!/bin/bash

ID=/home/node/app

docker run -it --rm \
    --name node-install \
    -v $PWD:$ID \
    -v $PWD/docs/dist:$ID/dist \
    -w $ID \
    --entrypoint /bin/sh \
    node:lts-slim \
    $ID/05_build.sh
