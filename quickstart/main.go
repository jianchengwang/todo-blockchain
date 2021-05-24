package main

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/joho/godotenv"
	"log"
	"quickstart/block"
	"quickstart/web"
	"time"
)

func main()  {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	go func() {
		t := time.Now()
		genesisBlock := block.Block{Timestamp: t.String()}
		spew.Dump(genesisBlock)
		block.Blockchain = append(block.Blockchain, genesisBlock)
	}()
	log.Fatal(web.Run())
}