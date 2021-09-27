package services

import (
	"fabric-go-sdk-demo/pkg/errcode"
	"fabric-go-sdk-demo/pkg/response"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func queryLedgerInfo(c *gin.Context)  {
	ledgerInfo, err := QueryLedgerInfo()
	if err != nil {
		response.Error(c, err)
	}
	response.Success(c, ledgerInfo)
}

func queryLatestBlocksInfo(c *gin.Context) {
	latestBlockList, err := QueryLatestBlocksInfo()
	if err != nil {
		response.Error(c, err)
	}
	response.Success(c, latestBlockList)
}

func queryBlockByBlockNumber(c *gin.Context) {
	num, err := strconv.ParseInt(c.Query("num"), 10, 64)
	if err != nil {
		response.Error(c, errcode.ErrInvalidParam)
	}
	block, err := QueryBlockByBlockNumber(num)
	if err != nil {
		response.Error(c, err)
	}
	response.Success(c, block)
}

func queryTransactionByTxId(c *gin.Context) {
	txId := c.Query("txId")
	transaction, err := QueryTransactionByTxId(txId)
	if  err != nil {
		response.Error(c, err)
	}
	response.Success(c, transaction)
}

func NewRoute() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"},
		AllowHeaders:     []string{"Content-type", "User-Agent"},
		AllowCredentials: true,
		AllowOrigins:     []string{"*"},
	}))

	// 区块链浏览器信息
	run := r.Group("/bw")
	{
		run.GET("/queryLedgerInfo", queryLedgerInfo) // 查询账本信息
		run.GET("/queryLatestBlocksInfo", queryLatestBlocksInfo) // 查询最新10个区块信息
		run.GET("/queryBlockByBlockNumber", queryBlockByBlockNumber) // 查询指定区块信息
		run.GET("/queryTransactionByTxId", queryTransactionByTxId) // 查询交易信息
	}
	r.NoRoute(func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, "/")
	})

	r.Run(":8081")
	return r
}
