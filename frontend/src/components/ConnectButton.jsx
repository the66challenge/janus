import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { localhost, neonDevnet } from '../config/wagmi';
import { motion } from 'framer-motion';
import { User, ChevronDown, Wallet, AlertTriangle } from 'lucide-react';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [connectionError, setConnectionError] = useState(null);

  const isCorrectNetwork = chainId === localhost.id || chainId === neonDevnet.id;
  const networkName = chainId === localhost.id ? 'Localhost' : chainId === neonDevnet.id ? 'Neon DevNet' : 'Unknown';

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
        
        {/* Connected Wallet Display */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg text-white backdrop-blur-sm"
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
          </motion.div>
          
          {/* Disconnect Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={disconnect}
            className="px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all duration-300 text-sm font-semibold backdrop-blur-sm"
          >
            Disconnect
          </motion.button>
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