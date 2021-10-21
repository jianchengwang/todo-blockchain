#!/bin/bash

docker rm private-bsc -f

rm -rf bsc/bsc.log*
rm -rf bsc/geth.ipc
rm -rf bsc/geth
