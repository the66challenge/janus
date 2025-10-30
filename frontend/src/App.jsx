import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { config } from './config/wagmi';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { SwapPage } from './pages/SwapPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { SecurityPage } from './pages/SecurityPage';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="swap" element={<SwapPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="security" element={<SecurityPage />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;