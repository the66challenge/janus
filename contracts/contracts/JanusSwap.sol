// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title JanusSwap
 * @dev Simple AMM for swapping ETH <-> F1 Team Tokens
 * This is the VULNERABLE version that will be hardened after SecureDApp audit
 */
contract JanusSwap is ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Token being traded
    IERC20 public immutable token;

    // Liquidity reserves
    uint256 public reserveETH;
    uint256 public reserveToken;

    // Events
    event LiquidityAdded(
        address indexed provider,
        uint256 ethAmount,
        uint256 tokenAmount
    );
    event LiquidityRemoved(
        address indexed provider,
        uint256 ethAmount,
        uint256 tokenAmount
    );
    event Swap(address indexed user, uint256 ethIn, uint256 tokenOut);

    constructor(address _token) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
    }

    /**
     * @dev Add liquidity to the pool
     */
    function addLiquidity(uint256 tokenAmount) external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        require(tokenAmount > 0, "Must send tokens");

        token.safeTransferFrom(msg.sender, address(this), tokenAmount);

        reserveETH += msg.value;
        reserveToken += tokenAmount;

        emit LiquidityAdded(msg.sender, msg.value, tokenAmount);
    }

    /**
     * @dev Swap ETH for tokens
     * @param minAmountOut Minimum amount of tokens to receive (slippage protection)
     */
    function swapExactETHForTokens(
        uint256 minAmountOut
    ) external payable nonReentrant returns (uint256 amountOut) {
        require(msg.value > 0, "Must send ETH");
        require(reserveToken > 0, "No liquidity");

        // Calculate output amount using constant product formula: x * y = k
        amountOut = getAmountOut(msg.value, reserveETH, reserveToken);

        require(amountOut >= minAmountOut, "Slippage too high");
        require(amountOut <= reserveToken, "Insufficient liquidity");

        // Update reserves
        reserveETH += msg.value;
        reserveToken -= amountOut;

        // Transfer tokens to user
        token.safeTransfer(msg.sender, amountOut);

        emit Swap(msg.sender, msg.value, amountOut);
    }

    /**
     * @dev Calculate output amount based on constant product formula
     */
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256) {
        require(amountIn > 0, "Invalid input amount");
        require(reserveIn > 0 && reserveOut > 0, "Invalid reserves");

        // Apply 0.3% fee
        uint256 amountInWithFee = amountIn * 997;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;

        return numerator / denominator;
    }

    /**
     * @dev Get current price (tokens per ETH)
     */
    function getPrice() external view returns (uint256) {
        if (reserveETH == 0) return 0;
        return (reserveToken * 1e18) / reserveETH;
    }
}
