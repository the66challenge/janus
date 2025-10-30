import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { config } from './config/wagmi';
import { Layout } from './components/Layout';
import LandingPage from './pages/LandingPage';
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
            {/* Epic F1 Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main App Routes */}
            <Route path="/app" element={<Layout />}>
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