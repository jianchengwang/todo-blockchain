# dockerd-blockscout
使用 Docker 镜像快速搭建 [BlockScout](https://github.com/blockscout/blockscout) 以太坊区块浏览器服务。基础镜像 [pygdev/blockscout](https://hub.docker.com/r/pygdev/blockscout) 使用 [BlockScout](https://github.com/blockscout/blockscout) 最新 `master` 分支进行自动编译。

## 准备工作
1. 安装 docker 以及 docker-compose 容器编排工具
3. 自建一个 `geth` 全节点，需要开放 `http` 和 `ws` 接口，并且允许 `net,debug,eth,web3,txpool` 等模块。示例：
    ```bash
    geth --syncmode full --gcmode archive --http --http.vhosts='*' --http.addr '0.0.0.0' --http.port 8545 --http.api 'net,debug,eth,web3,txpool' --http.corsdomain '*' --ws --ws.addr '0.0.0.0' --ws.port 8546 --ws.api 'net,debug,eth,web3,txpool' --ws.origins '*'
    ```

## 修改配置
首先将 `config.env.example` 文件重命名为 `config.env`，然后根据自己的情况修改 `ETHEREUM_JSONRPC_HTTP_URL` 和 `ETHEREUM_JSONRPC_WS_URL`。也可以添加 BlockScout 支持的[环境变量](https://docs.blockscout.com/for-developers/information-and-settings/env-variables)。


## 初始数据库
首先启动 PostgreSQL 服务器并后台运行。
```bash
docker volume create postgres-data-volume
docker-compose up -d postgres
```

然后创建 BlockScount 数据库并自动创建所有表，此命令只需要执行一次，初始化数据库后无需再执行。
```bash
docker-compose up migrate
```

## 启动BlockScount
```bash
docker-compose up -d blockscout
```
执行完成之后浏览器访问 `http://localhost:4000` 进行查看。

## 参考文档
[How can I customize the coin symbol?](https://docs.blockscout.com/for-users/faqs/how-can-i-customize-the-coin-symbol)

