import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { localhost, neonDevnet } from '../config/wagmi';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isCorrectNetwork = chainId === localhost.id || chainId === neonDevnet.id;
  const networkName = chainId === localhost.id ? 'Localhost' : chainId === neonDevnet.id ? 'Neon DevNet' : 'Unknown';

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
        
        <div className="px-4 py-2 bg-gray-800 rounded-lg font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="btn-primary"
    >
      Connect Wallet
    </button>
  );
}