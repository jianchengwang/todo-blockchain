module github.com/cosmonaut/blogclient

go 1.16

require (
	github.com/cosmonaut/blog v0.0.0-00010101000000-000000000000
	github.com/tendermint/starport v0.18.0
)

replace github.com/cosmonaut/blog => ../blog

replace github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
