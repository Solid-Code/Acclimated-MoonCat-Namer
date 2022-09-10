// SPDX-License-Identifier: MIT
// Tested cheaper. maybe new ways to save gas?
pragma solidity ^0.8.0;

import "./IMoonCatAcclimator.sol";
import "./IMoonCatRescue.sol";

contract nameAcclimatedMoonCat {
   address constant MCRescue_Address = 0x60cd862c9C687A9dE49aecdC3A99b74A4fc54aB6;
   address constant MCAcclimator_Address = 0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69;

  function onERC721Received(address, address from, uint256 tokenId, bytes calldata data) public returns (bytes4) {
    require(data.length > 0, "no name provided");
    require(data.length <= 32, "name too long");
    IMoonCatAcclimator(MCAcclimator_Address).unwrap(tokenId);
    bytes5 catId = IMoonCatRescue(MCRescue_Address).rescueOrder(tokenId);
    IMoonCatRescue(MCRescue_Address).nameCat(catId,bytes32(data));
    IMoonCatRescue(MCRescue_Address).makeAdoptionOfferToAddress(catId, 0, MCAcclimator_Address);
    IMoonCatAcclimator(MCAcclimator_Address).wrap(tokenId);
    IMoonCatAcclimator(MCAcclimator_Address).safeTransferFrom(address(this), from, tokenId);
    return this.onERC721Received.selector;
  }
}
