package main

import (
	sdkInit "fabric-go-sdk-demo/sdkinit"
	"fabric-go-sdk-demo/services"
	"fmt"
	"os"
)

const (
	cc_name = "simplecc"
	cc_version = "1.0.0"
)

var App sdkInit.Application
func main()  {

	// goland remote ssh开发的时候，获取不到自定义的PATH
	os.Setenv("PATH", os.Getenv("PATH") + ":/usr/local/go/bin")
	// init orgs information
	orgs := []*sdkInit.OrgInfo{
		{
			OrgAdminUser:  "Admin",
			OrgName:       "Org1",
			OrgMspId:      "Org1MSP",
			OrgUser:       "User1",
			OrgPeerNum:    2,
			OrgAnchorFile: "./fixtures/channel-artifacts/Org1MSPanchors.tx",
		},
	}

	// init sdk env info
	info := sdkInit.SdkEnvInfo{
		ChannelID:        "mychannel",
		ChannelConfig:    "./fixtures/channel-artifacts/channel.tx",
		Orgs:             orgs,
		OrdererAdminUser: "Admin",
		OrdererOrgName:   "OrdererOrg",
		OrdererEndpoint:  "orderer.example.com",
		ChaincodeID:      cc_name,
		ChaincodePath:    "/root/workspace/todo-blockchain/fabric-test/fabric-go-sdk-demo/chaincode", // absolute path or relative to gopath
		ChaincodeVersion: cc_version,
	}

	// sdk setup
	sdk, err := sdkInit.Setup("config.yaml", &info)
	if err != nil {
		fmt.Println(">> SDK setup error:", err)
		os.Exit(-1)
	}
	fmt.Println(sdk)

	//// create channel and join
	//if err := sdkInit.CreateAndJoinChannel(&info); err != nil {
	//	fmt.Println(">> Create channel and join error:", err)
	//	os.Exit(-1)
	//}

	// create chaincode lifecycle
	//if err := sdkInit.CreateCCLifecycle(&info, 1, false, sdk); err != nil {
	//	fmt.Println(">> create chaincode lifecycle error: %v", err)
	//	os.Exit(-1)
	//}
	//
	//// invoke chaincode set status
	//fmt.Println(">> 通过链码外部服务设置链码状态......")
	//
	//if err := info.InitService(info.ChaincodeID, info.ChannelID, info.Orgs[0], sdk);err != nil{
	//
	//	fmt.Println("InitService successful")
	//	os.Exit(-1)
	//}
	//
	//App=sdkInit.Application{
	//	SdkEnvInfo: &info,
	//}
	//fmt.Println(">> 设置链码状态完成")
	//
	//a:=[]string{"set","ID","123"}
	//ret, err := App.Set(a)
	//if err != nil {
	//	fmt.Println(err)
	//}
	//fmt.Println("<--- 添加信息　--->：", ret)


	//b := []string{"get","ID"}
	//response, err := App.Get(b)
	//if err != nil {
	//	fmt.Println(err)
	//}
	//fmt.Println("<--- 查询信息　--->：", response)

	services.InitChainBrowserService()
	services.NewRoute()
}
