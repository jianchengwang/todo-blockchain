FROM golang:1.17 as final

# Install minimum necessary dependencies
ENV PACKAGES curl make git libc-dev bash gcc
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y $PACKAGES

# Download evmos
RUN wget https://github.com/tharsis/evmos/releases/download/v0.2.0/evmos_0.2.0_Linux_x86_64.tar.gz && tar -C /usr/local/bin -xzf evmos_0.2.0_Linux_x86_64.tar.gz

# Workdir
WORKDIR /root/.evmosd

# Expose
EXPOSE 26656 26657 1317 8545 8546

# Entrypoint
ENTRYPOINT ["evmosd"]



