import { useState, useRef, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain, useBalance } from 'wagmi';
import { localhost, neonDevnet } from '../config/wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown, Wallet, AlertTriangle, Copy, ExternalLink, LogOut } from 'lucide-react';
import { CONTRACTS } from '../config/contracts';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [connectionError, setConnectionError] = useState(null);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowWalletDetails(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  });

  // Get MCLAREN token balance
  const { data: mclarenBalance } = useReadContract({
    ...CONTRACTS.MCLAREN_TOKEN,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const isCorrectNetwork = chainId === localhost.id || chainId === neonDevnet.id;
  const networkName = chainId === localhost.id ? 'Localhost' : chainId === neonDevnet.id ? 'Neon DevNet' : 'Unknown';

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const formatBalance = (balance, decimals = 18, symbol = '') => {
    if (!balance) return '0.00';
    const formatted = parseFloat(formatEther(balance)).toFixed(4);
    return `${formatted} ${symbol}`;
  };

  const handleConnect = async () => {
    try {
      setConnectionError(null);
      if (connectors && connectors.length > 0) {
        await connect({ connector: connectors[0] });
      } else {
        setConnectionError('No wallet connectors available. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionError(error.message || 'Failed to connect wallet');
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        {!isCorrectNetwork && (
          <div className="flex gap-2">
            <button
              onClick={() => switchChain({ chainId: localhost.id })}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold"
            >
              Localhost
            </button>
            <button
              onClick={() => switchChain({ chainId: neonDevnet.id })}
              className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm font-semibold"
            >
              Neon DevNet
            </button>
          </div>
        )}
        
        {isCorrectNetwork && (
          <div className="px-3 py-1 bg-green-800 text-green-200 rounded text-sm font-semibold">
            {networkName}
          </div>
        )}
        
        {/* F1 Pilot Profile with Wallet Details */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowWalletDetails(!showWalletDetails)}
            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg text-white hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">F1 Pilot</div>
              <div className="text-sm font-mono font-semibold">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showWalletDetails ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Wallet Details Dropdown */}
          <AnimatePresence>
            {showWalletDetails && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 right-0 w-80 bg-gray-900/95 backdrop-blur-xl border border-orange-500/30 rounded-xl shadow-2xl shadow-orange-500/10 z-50"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">F1 Racing Pilot</div>
                      <div className="text-xs text-gray-400">Connected Wallet</div>
                    </div>
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Wallet Address</div>
                      <div className="text-sm font-mono text-white">
                        {address?.slice(0, 12)}...{address?.slice(-8)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyAddress}
                        className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
                      >
                        {copiedAddress ? (
                          <span className="text-xs text-green-400 font-semibold">Copied!</span>
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
                        className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Network Status */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Network</div>
                      <div className={`text-sm font-semibold ${isCorrectNetwork ? 'text-green-400' : 'text-red-400'}`}>
                        {networkName}
                      </div>
                    </div>
                    {!isCorrectNetwork && (
                      <div className="flex gap-1">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => switchChain({ chainId: localhost.id })}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Localhost
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => switchChain({ chainId: neonDevnet.id })}
                          className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          Neon
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Wallet Balances */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="text-xs text-gray-400 mb-3">Your Wallet</div>
                  <div className="space-y-3">
                    {/* ETH Balance */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">ETH</div>
                        <span className="text-sm text-gray-300">Ethereum</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {formatBalance(ethBalance?.value, 18, 'ETH')}
                      </div>
                    </div>
                    
                    {/* MCLAREN Balance */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">M</div>
                        <span className="text-sm text-gray-300">McLaren Token</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {formatBalance(mclarenBalance, 18, 'MCLAREN')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      disconnect();
                      setShowWalletDetails(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all duration-300 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect Wallet
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleConnect}
        disabled={isConnecting}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </>
        )}
      </motion.button>

      {/* Error Message */}
      {(connectionError || connectError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm max-w-xs"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{connectionError || connectError?.message}</span>
        </motion.div>
      )}

      {/* Wallet Installation Hint */}
      {!connectors || connectors.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm max-w-xs"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <div>
            <div className="font-semibold">No wallet detected</div>
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-200 hover:text-yellow-100 underline"
            >
              Install MetaMask
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}