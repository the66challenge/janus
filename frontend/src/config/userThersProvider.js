import { useMemo } from 'react';
import { useWalletClient } from 'wagmi';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

/**
 * Convert Wagmi's walletClient to ethers Provider and Signer
 */
export function useEthersProvider() {
    const { data: walletClient } = useWalletClient();

    return useMemo(() => {
        if (!walletClient) return { provider: null, signer: null };

        const { account, chain, transport } = walletClient;
        const network = {
            chainId: chain.id,
            name: chain.name,
            ensAddress: chain.contracts?.ensRegistry?.address,
        };

        const provider = new BrowserProvider(transport, network);
        const signer = new JsonRpcSigner(provider, account.address);

        return { provider, signer };
    }, [walletClient]);
}