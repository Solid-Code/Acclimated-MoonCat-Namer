// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IMoonCatAcclimator.sol";
import "./IMoonCatRescue.sol";

contract nameAcclimatedMoonCat {
   address constant MCRescue_Address = 0x60cd862c9C687A9dE49aecdC3A99b74A4fc54aB6;
   address constant MCAcclimator_Address = 0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69;

  function onERC721Received(address, address from, uint256 tokenId, bytes calldata data) public returns (bytes4) {
    require(data.length > 0, "no name provided");
    require(data.length <= 32, "name too long");
    MoonCatAcclimator(MCAcclimator_Address).unwrap(tokenId);
    bytes5 catId = MoonCatRescue(MCRescue_Address).rescueOrder(tokenId);
    MoonCatRescue(MCRescue_Address).nameCat(catId,bytes32(data));
    MoonCatRescue(MCRescue_Address).makeAdoptionOfferToAddress(catId, 0, MCAcclimator_Address);
    MoonCatAcclimator(MCAcclimator_Address).wrap(tokenId);
    MoonCatAcclimator(MCAcclimator_Address).safeTransferFrom(address(this), from, tokenId);
    return this.onERC721Received.selector;
  }
}
