// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title JanuPolis
 * @dev Dynamic NFT Marketplace for F1 collectibles
 * NFTs can be updated by oracle based on real race results
 */
contract JanuPolis is ERC721URIStorage, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Payment token (F1 Team Token)
    IERC20 public immutable paymentToken;

    // Oracle address (authorized to update NFT metadata)
    address public oracle;

    // Token counter
    uint256 private _nextTokenId;

    // NFT Listing structure
    struct Listing {
        uint256 price;
        address seller;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;

    // Events
    event NFTMinted(uint256 indexed tokenId, address indexed owner, string uri);
    event NFTListed(
        uint256 indexed tokenId,
        uint256 price,
        address indexed seller
    );
    event NFTSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );
    event NFTUpdated(uint256 indexed tokenId, string newUri);
    event OracleUpdated(address indexed oldOracle, address indexed newOracle);

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle can call");
        _;
    }

    constructor(
        address _paymentToken,
        address _oracle
    ) ERC721("Janus F1 dNFT", "JF1") Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid payment token");
        require(_oracle != address(0), "Invalid oracle address");

        paymentToken = IERC20(_paymentToken);
        oracle = _oracle;
    }

    /**
     * @dev Mint new dNFT (only owner)
     */
    function mintNFT(
        address to,
        string memory uri
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(tokenId, to, uri);
        return tokenId;
    }

    /**
     * @dev List NFT for sale
     */
    function listNFT(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be > 0");

        listings[tokenId] = Listing({
            price: price,
            seller: msg.sender,
            isActive: true
        });

        emit NFTListed(tokenId, price, msg.sender);
    }

    /**
     * @dev Buy NFT with payment tokens
     * THIS IS VULNERABLE TO FRONT-RUNNING (will be protected by Atomic Bundle)
     */
    function buyNFT(uint256 tokenId) external nonReentrant {
        Listing memory listing = listings[tokenId];

        require(listing.isActive, "NFT not for sale");
        require(
            ownerOf(tokenId) == listing.seller,
            "Seller no longer owns NFT"
        );

        // Transfer payment tokens from buyer to seller
        paymentToken.safeTransferFrom(
            msg.sender,
            listing.seller,
            listing.price
        );

        // Transfer NFT from seller to buyer
        _transfer(listing.seller, msg.sender, tokenId);

        // Deactivate listing
        listings[tokenId].isActive = false;

        emit NFTSold(tokenId, msg.sender, listing.price);
    }

    /**
     * @dev Update NFT metadata (only oracle can call after race events)
     */
    function updateNFTMetadata(
        uint256 tokenId,
        string memory newUri
    ) external onlyOracle {
        require(_ownerOf(tokenId) != address(0), "Token doesn't exist");
        _setTokenURI(tokenId, newUri);

        emit NFTUpdated(tokenId, newUri);
    }

    /**
     * @dev Update oracle address
     */
    function setOracle(address newOracle) external onlyOwner {
        require(newOracle != address(0), "Invalid oracle address");
        address oldOracle = oracle;
        oracle = newOracle;

        emit OracleUpdated(oldOracle, newOracle);
    }

    /**
     * @dev Get listing details
     */
    function getListing(
        uint256 tokenId
    ) external view returns (Listing memory) {
        return listings[tokenId];
    }
}
