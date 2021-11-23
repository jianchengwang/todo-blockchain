#!/bin/bash

docker run -itd --restart=unless-stopped --name evmosnode0 -v /root/data/evmosnode/.evmosd:/root/.evmosd -p 26656:26656 -p 26657:26657 -p 1317:1317 -p 8545:8545 -p 8546:8546 evmosnode:v0.2.0 start --json-rpc.enable=true --json-rpc.api="eth,web3,net" --home="/root/.evmosd" --allow-insecure-unlock --rpccorsdomain "*"
