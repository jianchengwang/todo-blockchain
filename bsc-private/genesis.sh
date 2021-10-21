
#!/bin/bash

cp UTC--* ./bsc/keystore/
docker run --rm -v $(pwd):/data private_bsc:v1.1.2 init /data/genesis.json --datadir /data/bsc
