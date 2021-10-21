#!/bin/bash

docker exec -it private-bsc geth attach /data/bsc/geth.ipc

# 设置地址无限期解锁
# personal.unlockAccount("0x57a8f14369c39379b8c860aca78ca33c641b81c9","owner",0)
# 开始挖矿
# miner.start(1)
