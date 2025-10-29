// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title JanusAugur
 * @dev Prediction market for F1 race outcomes
 */
contract JanusAugur is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    address public oracle;

    uint256 public constant STAKE_AMOUNT = 10 * 10 ** 18; // 10 tokens

    struct Market {
        string description;
        uint256 yesPool;
        uint256 noPool;
        bool resolved;
        bool outcome;
        uint256 createdAt;
    }

    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => bool)) public predictions; // marketId => user => prediction (true = yes)
    mapping(uint256 => mapping(address => bool)) public hasClaimed; // Track if user claimed winnings

    uint256 public nextMarketId;

    event MarketCreated(uint256 indexed marketId, string description);
    event PredictionPlaced(
        uint256 indexed marketId,
        address indexed user,
        bool prediction
    );
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event WinningsClaimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle");
        _;
    }

    constructor(address _token, address _oracle) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token");
        require(_oracle != address(0), "Invalid oracle");
        token = IERC20(_token);
        oracle = _oracle;
    }

    /**
     * @dev Create new prediction market
     */
    function createMarket(
        string calldata description
    ) external onlyOwner returns (uint256) {
        uint256 marketId = nextMarketId++;

        markets[marketId] = Market({
            description: description,
            yesPool: 0,
            noPool: 0,
            resolved: false,
            outcome: false,
            createdAt: block.timestamp
        });

        emit MarketCreated(marketId, description);
        return marketId;
    }

    /**
     * @dev Place prediction (stake tokens)
     */
    function placePrediction(
        uint256 marketId,
        bool prediction
    ) external nonReentrant {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");
        require(
            predictions[marketId][msg.sender] == false ||
                (predictions[marketId][msg.sender] == prediction),
            "Already predicted differently"
        );

        // Transfer stake from user
        token.safeTransferFrom(msg.sender, address(this), STAKE_AMOUNT);

        // Add to pool
        if (prediction) {
            market.yesPool += STAKE_AMOUNT;
        } else {
            market.noPool += STAKE_AMOUNT;
        }

        predictions[marketId][msg.sender] = prediction;

        emit PredictionPlaced(marketId, msg.sender, prediction);
    }

    /**
     * @dev Resolve market (only oracle)
     */
    function resolveMarket(uint256 marketId, bool outcome) external onlyOracle {
        Market storage market = markets[marketId];
        require(!market.resolved, "Already resolved");

        market.resolved = true;
        market.outcome = outcome;

        emit MarketResolved(marketId, outcome);
    }

    /**
     * @dev Claim winnings
     */
    function claimWinnings(uint256 marketId) external nonReentrant {
        Market memory market = markets[marketId];
        require(market.resolved, "Market not resolved");
        require(!hasClaimed[marketId][msg.sender], "Already claimed");
        require(
            predictions[marketId][msg.sender] == market.outcome,
            "Wrong prediction"
        );

        uint256 winningPool = market.outcome ? market.yesPool : market.noPool;
        uint256 losingPool = market.outcome ? market.noPool : market.yesPool;

        require(winningPool > 0, "No winning pool");

        // Calculate winnings proportionally
        uint256 winnings = STAKE_AMOUNT +
            ((STAKE_AMOUNT * losingPool) / winningPool);

        hasClaimed[marketId][msg.sender] = true;

        token.safeTransfer(msg.sender, winnings);

        emit WinningsClaimed(marketId, msg.sender, winnings);
    }

    /**
     * @dev Update oracle
     */
    function setOracle(address newOracle) external onlyOwner {
        require(newOracle != address(0), "Invalid oracle");
        oracle = newOracle;
    }
}
