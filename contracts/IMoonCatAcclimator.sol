// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

interface IMoonCatAcclimator
{
    function wrap(uint256 _rescueOrder) external returns (uint256);

    function unwrap(uint256 _tokenId) external returns (uint256);

    function ownerOf(uint256 _tokenId) external;

    function safeTransferFrom(address from, address to, uint256 tokenId) external;

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) external;

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}
