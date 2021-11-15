#!/bin/bash
echo 'Asia/Shanghai' > /etc/localtime
echo 'Asia/Shanghai' > /etc/timezone/timezone/timezone

docker run -itd --restart=unless-stopped -v /etc/localtime:/etc/localtime -v /etc/timezone/timezone/timezone:/etc/timezone --name private-bsc -v /root/data/bsc-private/:/data -p 30311:30311 -p 8545:8545 -p 8546:8546 private_bsc:v1.1.3 --config config.toml --datadir /data/bsc  --nodiscover --allow-insecure-unlock --rpccorsdomain "*"
