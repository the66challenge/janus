import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { neonDevnet } from '../config/wagmi';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isCorrectNetwork = chainId === neonDevnet.id;

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        {!isCorrectNetwork && (
          <button
            onClick={() => switchChain({ chainId: neonDevnet.id })}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold"
          >
            Switch to Neon DevNet
          </button>
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