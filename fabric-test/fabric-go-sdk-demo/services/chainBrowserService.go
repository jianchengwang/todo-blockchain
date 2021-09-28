package services

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-sdk-go/pkg/client/ledger"
	providersFab "github.com/hyperledger/fabric-sdk-go/pkg/common/providers/fab"
	"github.com/hyperledger/fabric-sdk-go/pkg/core/config"
	"github.com/hyperledger/fabric-sdk-go/pkg/fab"
	"github.com/hyperledger/fabric-sdk-go/pkg/fabsdk"
	"github.com/hyperledger/fabric-sdk-go/pkg/util/pathvar"
	"log"
	"strings"
)

//区块链浏览器服务

var mainSDK *fabsdk.FabricSDK
var ledgerClient *ledger.Client

const (
	org1Name      = "Org1"
	org1Peer0 	  = "peer0.org1.example.com"
	org1AdminUser = "Admin"
	org1User      = "User1"
	channelID     = "mychannel"
	configPath = "config.yaml"
)
var chainBrowserConfigPath = configPath

//初始化区块浏览器SDK
func InitChainBrowserService(){
	log.Println("============ 初始化区块浏览器服务 ============")
	//获取fabsdk
	var err error
	ConfigBackend := config.FromFile(pathvar.Subst(chainBrowserConfigPath))
	mainSDK, err = fabsdk.New(ConfigBackend)
	if err != nil {
		panic(fmt.Sprintf("Failed to create new SDK: %s", err))
	}
	//获取context
	org1AdminChannelContext := mainSDK.ChannelContext(channelID, fabsdk.WithUser(org1AdminUser), fabsdk.WithOrg(org1Name))
	//Ledger client
	ledgerClient, err = ledger.New(org1AdminChannelContext)
	if err != nil {
		fmt.Printf("Failed to create new resource management client: %s", err)
	}
}


//查询账本信息
func QueryLedgerInfo() (*providersFab.BlockchainInfoResponse,error){
	ledgerInfo, err := ledgerClient.QueryInfo()
	if err != nil {
		fmt.Printf("QueryInfo return error: %s", err)
		return nil, err
	}
	QueryPeerConfig(ledgerInfo)
	return ledgerInfo,nil
}

//查询节点信息
func QueryPeerConfig(ledgerInfo *providersFab.BlockchainInfoResponse) (*providersFab.EndpointConfig, error){
	sdk := mainSDK
	configBackend, err := sdk.Config()
	if err != nil {
		fmt.Println("failed to get config backend, error: %s", err)
	}

	endpointConfig, err := fab.ConfigFromBackend(configBackend)
	if err != nil {
		fmt.Println("failed to get endpoint config, error: %s", err)
	}

	expectedPeerConfig1, _ := endpointConfig.PeerConfig("peer0.org1.example.com")
	fmt.Println("Unable to fetch Peer config for %s", "peer0.org1.example.com")
	expectedPeerConfig2, _ := endpointConfig.PeerConfig("peer1.org1.example.com")
	fmt.Println("Unable to fetch Peer config for %s", "peer1.org1.example.com")

	if !strings.Contains(ledgerInfo.Endorser, expectedPeerConfig1.URL) && !strings.Contains(ledgerInfo.Endorser, expectedPeerConfig2.URL) {
		fmt.Println("Expecting %s or %s, got %s", expectedPeerConfig1.URL, expectedPeerConfig2.URL, ledgerInfo.Endorser)
	}

	return &endpointConfig, nil
}

//查询最新10个区块信息
func QueryLatestBlocksInfo() ([]*Block,error){
	ledgerInfo, err := ledgerClient.QueryInfo()
	if err != nil {
		fmt.Printf("QueryLatestBlocksInfo return error: %s\n", err)
		return nil, err
	}
	latestBlockList := []*Block{}
	lastetBlockNum := ledgerInfo.BCI.Height-1
	minBlockNum := 1
	if lastetBlockNum > 10 {
		minBlockNum = int(lastetBlockNum - 10)
	}
	for i:=lastetBlockNum;i>0&&int(i)>minBlockNum;i--{
		block,err :=QueryBlockByBlockNumber(int64(i))
		if err != nil {
			fmt.Printf("QueryLatestBlocksInfo return error: %s", err)
			return latestBlockList, err
		}
		latestBlockList = append(latestBlockList,block)
	}
	return latestBlockList,nil
}
func QueryLatestBlocksInfoJsonStr()(string,error){
	blockList,err:=QueryLatestBlocksInfo()
	jsonStr,err :=json.Marshal(blockList)
	return string(jsonStr),err
}

//查询指定区块信息
func QueryBlockByBlockNumber(num int64) (*Block,error){
	rawBlock,err :=ledgerClient.QueryBlock(uint64(num))
	if err != nil {
		fmt.Printf("QueryBlock return error: %s", err)
		return nil, err
	}

	//解析区块体
	txList :=[]*Transaction{}
	for i :=range rawBlock.Data.Data{
		rawEnvelope,err :=GetEnvelopeFromBlock(rawBlock.Data.Data[i])
		if err != nil {
			fmt.Printf("QueryBlock return error: %s", err)
			return nil, err
		}
		transaction, err :=GetTransactionFromEnvelopeDeep(rawEnvelope)
		if err != nil {
			fmt.Printf("QueryBlock return error: %s", err)
			return nil, err
		}
		for i :=range transaction.TransactionActionList {
			transaction.TransactionActionList[i].BlockNum=rawBlock.Header.Number
		}
		txList= append(txList,transaction)
	}



	block :=Block{
		Number:       rawBlock.Header.Number,
		PreviousHash: rawBlock.Header.PreviousHash,
		DataHash:     rawBlock.Header.DataHash,
		BlockHash:    rawBlock.Header.DataHash, //需要计算
		TxNum:        len(rawBlock.Data.Data),
		TransactionList:     txList,
		CreateTime:   txList[0].TransactionActionList[0].Timestamp,
	}

	return &block,nil
}


//查询交易信息
func QueryTransactionByTxId(txId string) (*Transaction,error){
	rawTx,err :=ledgerClient.QueryTransaction(providersFab.TransactionID(txId))
	if err != nil {
		fmt.Printf("QueryBlock return error: %s", err)
		return nil, err
	}

	transaction, err :=GetTransactionFromEnvelopeDeep(rawTx.TransactionEnvelope)
	if err != nil {
		fmt.Printf("QueryBlock return error: %s", err)
		return nil, err
	}
	block,err :=ledgerClient.QueryBlockByTxID(providersFab.TransactionID(txId))
	if err != nil {
		fmt.Printf("QueryBlock return error: %s", err)
		return nil, err
	}
	for i :=range transaction.TransactionActionList {
		transaction.TransactionActionList[i].BlockNum=block.Header.Number
	}
	return transaction,nil
}
func QueryTransactionByTxIdJsonStr(txId string) (string,error){
	transaction,err:=QueryTransactionByTxId(txId)
	if err!=nil{
		return "",err
	}
	jsonStr,err :=json.Marshal(transaction)
	return string(jsonStr),err
}
