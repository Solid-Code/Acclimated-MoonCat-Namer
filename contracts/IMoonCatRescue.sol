// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

interface IMoonCatRescue {

    function rescueOrder(uint256 _rescueOrder) external view returns (bytes5 catId);

    function nameCat(bytes5 catId, bytes32 catName ) external;
    
    function makeAdoptionOfferToAddress(bytes5 catId, uint price, address to) external;
}
