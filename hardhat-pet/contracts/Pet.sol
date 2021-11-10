pragma solidity ^0.8.0;

import "./Token.sol";

contract Pet is Token {
    struct PetStruct {
        uint256 petId;
        string petName;
        address owner;
        uint256 growthValue;
        bool sell;
        uint256 sellPrice;
    }

    uint256 public createPetPrice = 10000;
    uint256 public sellMultiple = 2;
    uint256 public lastPetId = 0;
    uint256[] public petIds;
    mapping(uint256 => PetStruct) public petMap;

    function feed(uint256 petId, uint256 amount) external {
        require(petMap[petId].owner != address(0), "Not exist petId");
        require(petMap[petId].sell == false, "Pet on sell, cant feed");
        transfer(owner, amount);
        petMap[petId].growthValue += amount;
    }

    function createPet(string memory _petName) external {
        transfer(owner, createPetPrice);
        lastPetId += 1;
        PetStruct memory _pet = PetStruct(
            lastPetId,
            _petName,
            msg.sender,
            0,
            false,
            0
        );
        petIds.push(lastPetId);
        petMap[lastPetId] = _pet;
    }

    function minePets() external view returns (PetStruct[] memory) {
        PetStruct[] memory minePets = new PetStruct[](petIds.length);
        for (uint256 i = 0; i < petIds.length; i++) {
            if (petMap[petIds[i]].owner == msg.sender) {
                minePets[i] = petMap[petIds[i]];
            }
        }
        return minePets;
    }

    function sellPet(uint256 petId) external {
        require(petMap[petId].owner == msg.sender, "Not pet owner");
        petMap[petId].sell = true;
        petMap[petId].sellPrice =
            createPetPrice +
            petMap[petId].growthValue *
            sellMultiple;
    }

    function buyPet(uint256 petId) external {
        require(petMap[petId].owner != address(0), "Not exist petId");
        require(petMap[petId].owner != msg.sender, "You had owner this pet");
        uint256 sellPrice = petMap[petId].sellPrice;
        transfer(petMap[petId].owner, sellPrice);
        petMap[petId].owner = msg.sender;
        petMap[petId].sell = false;
        petMap[petId].sellPrice = 0;
    }
}
