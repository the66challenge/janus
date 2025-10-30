import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACTS } from '../config/contracts';

export function NFTMarketplace() {
  const { address, isConnected } = useAccount();
  const [nftListings, setNftListings] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock NFT data - in real implementation, you'd query these from contract events
  const mockNFTs = [
    {
      tokenId: 0,
      name: "Lando Norris Helmet",
      description: "Dynamic helmet that updates based on race performance",
      image: "🏎️", // Using emoji for now
      driver: "Lando Norris",
      team: "McLaren",
      rarity: "Legendary",
    },
    {
      tokenId: 1,
      name: "Oscar Piastri Gloves", 
      description: "Racing gloves with victory celebration animation",
      image: "🧤",
      driver: "Oscar Piastri", 
      team: "McLaren",
      rarity: "Rare",
    },
    {
      tokenId: 2,
      name: "McLaren Car Livery",
      description: "Full car design that evolves with championships",
      image: "🏁",
      driver: "Team",
      team: "McLaren", 
      rarity: "Epic",
    }
  ];

  // Get McLaren token balance
  const { data: mclarenBalance } = useReadContract({
    ...CONTRACTS.MCLAREN_TOKEN,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Get allowance for marketplace
  const { data: allowance } = useReadContract({
    ...CONTRACTS.MCLAREN_TOKEN,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.JANUS_POLIS.address] : undefined,
  });

  // Write contracts
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Approve tokens for marketplace
  const handleApprove = async (amount) => {
    writeContract({
      ...CONTRACTS.MCLAREN_TOKEN,
      functionName: 'approve',
      args: [CONTRACTS.JANUS_POLIS.address, parseEther(amount.toString())],
    });
  };

  // Buy NFT
  const handleBuyNFT = async (tokenId, price) => {
    if (!isConnected) return;

    // Check if approval is needed
    const priceWei = parseEther(price.toString());
    if (!allowance || allowance < priceWei) {
      await handleApprove(price);
      return;
    }

    writeContract({
      ...CONTRACTS.JANUS_POLIS,
      functionName: 'buyNFT',
      args: [BigInt(tokenId)],
    });
  };

  // Load NFT listings (mock implementation)
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      
      // Mock listings with prices
      const listings = mockNFTs.map((nft, index) => ({
        ...nft,
        price: [100, 75, 150][index], // Mock prices in MCLAREN tokens
        seller: '0x1234...5678', // Mock seller
        isActive: true,
      }));

      setNftListings(listings);
      setLoading(false);
    };

    loadListings();
  }, []);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 border-yellow-400';
      case 'Epic': return 'text-purple-400 border-purple-400';
      case 'Rare': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 text-ferrari-red">
        🖼️ Janus Market
      </h2>

      {/* User Balance */}
      {isConnected && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded">
          <div className="text-sm">
            <span className="text-gray-400">Your MCLAREN Balance: </span>
            <span className="font-bold">
              {mclarenBalance ? formatEther(mclarenBalance) : '0'} MCLAREN
            </span>
          </div>
        </div>
      )}

      {/* NFT Listings */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-pulse">Loading NFTs...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nftListings.map((nft) => (
            <div 
              key={nft.tokenId} 
              className={`border rounded-lg p-4 hover:bg-gray-800/30 transition-colors ${getRarityColor(nft.rarity)}`}
            >
              {/* NFT Image */}
              <div className="text-center mb-3">
                <div className="text-6xl mb-2">{nft.image}</div>
                <div className={`inline-block px-2 py-1 rounded text-xs border ${getRarityColor(nft.rarity)}`}>
                  {nft.rarity}
                </div>
              </div>

              {/* NFT Details */}
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{nft.name}</h3>
                <p className="text-gray-400 text-sm">{nft.description}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Driver:</span>
                  <span>{nft.driver}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Team:</span>
                  <span className="text-mclaren-orange">{nft.team}</span>
                </div>

                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">Price:</span>
                  <span>{nft.price} MCLAREN</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                {!isConnected ? (
                  <button className="btn-primary w-full opacity-50 cursor-not-allowed">
                    Connect Wallet
                  </button>
                ) : (
                  <div>
                    {/* Check if user has enough balance */}
                    {mclarenBalance && parseFloat(formatEther(mclarenBalance)) >= nft.price ? (
                      <button
                        onClick={() => handleBuyNFT(nft.tokenId, nft.price)}
                        disabled={isPending || isConfirming}
                        className="btn-primary w-full"
                      >
                        {isPending ? 'Approving...' : isConfirming ? 'Buying...' : 'Buy NFT'}
                      </button>
                    ) : (
                      <button className="btn-primary w-full opacity-50 cursor-not-allowed">
                        Insufficient MCLAREN
                      </button>
                    )}

                    {/* Atomic Purchase Button (Main MEV Protection Feature) */}
                    <button
                      className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors text-sm font-semibold"
                      onClick={() => setSelectedNFT(nft)}
                    >
                      🛡️ Atomic Pit Lane Purchase
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transaction Status */}
      {hash && (
        <div className="mt-4 p-3 bg-gray-800/50 rounded">
          <div className="text-sm">
            <div className="text-blue-400">
              Transaction: {hash.slice(0, 10)}...{hash.slice(-8)}
            </div>
            {isSuccess && (
              <div className="text-green-400 mt-1">✓ Purchase completed!</div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded">
          <div className="text-red-400 text-sm">
            Error: {error.message}
          </div>
        </div>
      )}

      {/* Atomic Purchase Modal */}
      {selectedNFT && (
        <AtomicPurchaseModal 
          nft={selectedNFT} 
          onClose={() => setSelectedNFT(null)}
          mclarenBalance={mclarenBalance}
        />
      )}
    </div>
  );
}

// Atomic Purchase Modal Component
function AtomicPurchaseModal({ nft, onClose, mclarenBalance }) {
  const { address } = useAccount();
  const [ethAmount, setEthAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bundleResult, setBundleResult] = useState(null);

  const handleAtomicPurchase = async () => {
    if (!ethAmount || !address) return;
    
    setIsProcessing(true);
    setBundleResult(null);
    
    try {
      // Import the atomic bundle service
      const { atomicBundleService } = await import('../services/atomicBundle.js');
      
      // Create a mock signer for demo (in production, use real signer)
      const mockSigner = {
        getAddress: () => Promise.resolve(address),
      };
      
      // Execute atomic bundle
      const result = await atomicBundleService.createAtomicBundle(
        mockSigner,
        parseFloat(ethAmount),
        0, // minTokenOut (could calculate based on slippage)
        nft.tokenId,
        nft.price
      );
      
      setBundleResult(result);
      
      if (result.success) {
        // Wait a bit to show success before closing
        setTimeout(() => {
          onClose();
        }, 3000);
      }
      
    } catch (error) {
      console.error('Atomic purchase failed:', error);
      setBundleResult({
        success: false,
        error: error.message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-green-400">
            🛡️ Atomic Pit Lane Purchase
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
            <p className="text-sm text-green-400 mb-2">
              <strong>MEV Protection Enabled:</strong>
            </p>
            <p className="text-xs text-gray-300">
              This feature bundles your ETH→MCLAREN swap and NFT purchase into a single atomic transaction, 
              preventing sandwich attacks and front-running.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2">{nft.name}</h4>
            <p className="text-sm text-gray-400 mb-2">Price: {nft.price} MCLAREN</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              ETH Amount (will be swapped to MCLAREN)
            </label>
            <input
              type="number"
              placeholder="0.1"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="input w-full"
              step="0.01"
            />
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <p>Bundle will execute:</p>
            <p>1. ⚡ Swap {ethAmount || 'X'} ETH → MCLAREN tokens</p>
            <p>2. 🖼️ Buy {nft.name} with MCLAREN</p>
            <p>3. 🛡️ All-or-nothing execution via Flashbots</p>
          </div>

          <button
            onClick={handleAtomicPurchase}
            disabled={!ethAmount || isProcessing}
            className="btn-primary w-full"
          >
            {isProcessing ? 'Creating Bundle...' : 'Execute Atomic Purchase'}
          </button>

          {/* Bundle Execution Result */}
          {bundleResult && (
            <div className={`p-3 rounded border ${
              bundleResult.success 
                ? 'bg-green-900/20 border-green-500 text-green-400' 
                : 'bg-red-900/20 border-red-500 text-red-400'
            }`}>
              {bundleResult.success ? (
                <div>
                  <div className="font-bold mb-1">✅ Bundle Executed Successfully!</div>
                  <div className="text-xs space-y-1">
                    <div>Bundle Hash: {bundleResult.bundleHash?.slice(0, 10)}...{bundleResult.bundleHash?.slice(-8)}</div>
                    <div>Block Number: {bundleResult.blockNumber}</div>
                    <div>Transactions: {bundleResult.transactions?.length}</div>
                    <div className="text-green-300 mt-2">{bundleResult.message}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-bold mb-1">❌ Bundle Failed</div>
                  <div className="text-xs">{bundleResult.error}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}