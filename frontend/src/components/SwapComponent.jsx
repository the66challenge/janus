import { useState } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { ethers } from 'ethers';
import { CONTRACTS } from '../config/contracts';

export function SwapComponent() {
  const { address, isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState('');
  const [minAmountOut, setMinAmountOut] = useState('');

  // Read user ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  });

  // Read contract data
  const { data: price } = useReadContract({
    ...CONTRACTS.JANUS_SWAP,
    functionName: 'getPrice',
  });

  const { data: reserveETH } = useReadContract({
    ...CONTRACTS.JANUS_SWAP,
    functionName: 'reserveETH',
  });

  const { data: reserveToken } = useReadContract({
    ...CONTRACTS.JANUS_SWAP,
    functionName: 'reserveToken',
  });

  const { data: mclarenBalance } = useReadContract({
    ...CONTRACTS.MCLAREN_TOKEN,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    }
  });

  // Write contract
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Calculate expected output
  const calculateOutput = () => {
    if (!ethAmount || !reserveETH || !reserveToken || ethAmount === '0') return '0';
    
    try {
      const amountIn = ethers.parseEther(ethAmount);
      // AMM formula: (amountIn * reserveToken) / (reserveETH + amountIn)
      const output = (amountIn * reserveToken) / (reserveETH + amountIn);
      return ethers.formatEther(output);
    } catch {
      return '0';
    }
  };

  const handleMaxClick = () => {
    if (ethBalance) {
      // Leave some ETH for gas fees (0.01 ETH)
      const maxAmount = ethBalance.value - ethers.parseEther('0.01');
      if (maxAmount > 0) {
        setEthAmount(ethers.formatEther(maxAmount));
      }
    }
  };

  const isValidAmount = () => {
    if (!ethAmount || !ethBalance) return false;
    try {
      const amount = ethers.parseEther(ethAmount);
      return amount > 0 && amount <= ethBalance.value;
    } catch (err) {
      console.warn('Invalid amount format:', err);
      return false;
    }
  };

  const handleSwap = async () => {
    if (!ethAmount || !isConnected) return;

    try {
      const minOut = minAmountOut ? ethers.parseEther(minAmountOut) : 0n;
      
      writeContract({
        ...CONTRACTS.JANUS_SWAP,
        functionName: 'swapExactETHForTokens',
        args: [minOut],
        value: ethers.parseEther(ethAmount),
      });
    } catch (err) {
      console.error('Swap failed:', err);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 text-mclaren-orange">
        💱 JanusSwap DEX
      </h2>

      {/* User Balances */}
      {isConnected && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
          <h3 className="text-sm font-semibold text-blue-300 mb-2">💰 Your Wallet</h3>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">ETH Balance:</span>
              <span className="font-mono">
                {ethBalance ? `${parseFloat(ethers.formatEther(ethBalance.value)).toFixed(4)} ETH` : '0 ETH'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">MCLAREN Balance:</span>
              <span className="font-mono">
                {mclarenBalance ? `${parseFloat(ethers.formatEther(mclarenBalance)).toFixed(2)} MCLAREN` : '0 MCLAREN'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Pool Info */}
      <div className="mb-4 p-3 bg-gray-800/50 rounded">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">🏊 Liquidity Pool</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">ETH Reserve:</span>
            <span>{reserveETH ? `${parseFloat(ethers.formatEther(reserveETH)).toFixed(4)} ETH` : '0 ETH'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">MCLAREN Reserve:</span>
            <span>{reserveToken ? `${parseFloat(ethers.formatEther(reserveToken)).toFixed(2)} MCLAREN` : '0 MCLAREN'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Exchange Rate:</span>
            <span>{price ? `${parseFloat(ethers.formatEther(price)).toFixed(2)} MCLAREN/ETH` : '0 MCLAREN/ETH'}</span>
          </div>
        </div>
      </div>

      {/* Swap Interface */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-400">You Send</label>
            {isConnected && ethBalance && (
              <button
                onClick={handleMaxClick}
                className="text-xs text-mclaren-orange hover:text-mclaren-orange/80 font-semibold"
              >
                MAX
              </button>
            )}
          </div>
          <div className="flex">
            <input
              type="number"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className={`input flex-1 rounded-r-none text-white font-mono ${
                ethAmount && !isValidAmount() ? 'border-red-500 bg-red-900/20' : ''
              }`}
              step="0.001"
              min="0"
            />
            <div className="px-3 py-2 bg-gray-700 border border-l-0 border-gray-600 rounded-r text-sm font-semibold">
              ETH
            </div>
          </div>
          {ethAmount && !isValidAmount() && (
            <div className="text-xs text-red-400 mt-1">
              {ethBalance ? 'Insufficient balance' : 'Invalid amount'}
            </div>
          )}
        </div>

        <div className="text-center">
          <span className="text-gray-400">↓</span>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">You Receive (Estimated)</label>
          <div className="flex">
            <input
              type="text"
              value={parseFloat(calculateOutput()).toFixed(6)}
              readOnly
              className="input flex-1 rounded-r-none bg-f1-black text-green-400 font-mono border-green-400/30"
            />
            <div className="px-3 py-2 bg-gray-700 border border-l-0 border-gray-600 rounded-r text-sm font-semibold">
              MCLAREN
            </div>
          </div>
          {ethAmount && calculateOutput() !== '0' && (
            <div className="text-xs text-gray-400 mt-1">
              Rate: {(parseFloat(calculateOutput()) / parseFloat(ethAmount)).toFixed(2)} MCLAREN per ETH
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Min. Amount Out (Slippage Protection)
          </label>
          <input
            type="number"
            placeholder="0.0"
            value={minAmountOut}
            onChange={(e) => setMinAmountOut(e.target.value)}
            className="input w-full text-white font-mono"
            step="0.01"
          />
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!isConnected || !ethAmount || !isValidAmount() || isPending || isConfirming}
          className={`btn-primary w-full text-lg font-bold py-3 ${
            !isConnected || !ethAmount || !isValidAmount() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mclaren-orange/80'
          }`}
        >
          {!isConnected 
            ? '🔗 Connect Wallet First'
            : !ethAmount
            ? '📝 Enter Amount'
            : !isValidAmount()
            ? '❌ Invalid Amount'
            : isPending 
            ? '⏳ Confirming Transaction...'
            : isConfirming
            ? '🔄 Processing Swap...'
            : `🏎️ Swap ${ethAmount} ETH → ${parseFloat(calculateOutput()).toFixed(2)} MCLAREN`
          }
        </button>

        {/* Transaction Status */}
        {hash && (
          <div className="text-sm">
            <div className="text-blue-400">
              Transaction Hash: {hash.slice(0, 10)}...{hash.slice(-8)}
            </div>
            {isSuccess && (
              <div className="text-green-400 mt-1">✓ Swap completed successfully!</div>
            )}
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm">
            Error: {error.message}
          </div>
        )}
      </div>
    </div>
  );
}