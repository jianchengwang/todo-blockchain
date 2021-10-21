FROM buildpack-deps:jessie-curl
ADD geth_linux /usr/local/bin/
RUN mv /usr/local/bin/geth_linux /usr/local/bin/geth && chmod +x /usr/local/bin/geth
EXPOSE 8545 8546 30303 30303/udp
WORKDIR /data
ENTRYPOINT ["geth"]
