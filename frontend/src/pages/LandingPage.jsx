import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoHero from '../components/VideoHero';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  Trophy, 
  Target, 
  Gauge,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const mainSectionRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section entrance animation
      ScrollTrigger.create({
        trigger: mainSectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        animation: gsap.fromTo(
          mainSectionRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        ),
        toggleActions: "play none none reverse"
      });

      // Features stagger animation
      ScrollTrigger.batch(".feature-card", {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { opacity: 0, y: 60, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }
          );
        },
        start: "top 85%"
      });

    }, mainSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Video Hero Section */}
      <VideoHero />

      {/* Main Website Section with Animated Background */}
      <AnimatedBackground variant="racing">
        <div ref={mainSectionRef} className="min-h-screen">
          
          {/* Features Section */}
          <section ref={featuresRef} className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                  Racing <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Features</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Built for speed, designed for precision. Experience DeFi at Formula 1 velocity.
                </p>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Lightning Swaps",
                    description: "Execute trades in milliseconds with our optimized AMM engine. Zero slippage, maximum speed.",
                    color: "orange",
                    gradient: "from-orange-500/20 to-red-500/20"
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "MEV Protection",
                    description: "Advanced MEV protection shields your trades from front-running and sandwich attacks.",
                    color: "blue",
                    gradient: "from-blue-500/20 to-cyan-500/20"
                  },
                  {
                    icon: <Trophy className="w-8 h-8" />,
                    title: "NFT Racing",
                    description: "Collect, trade, and race exclusive F1-themed NFTs. Own a piece of racing history.",
                    color: "purple",
                    gradient: "from-purple-500/20 to-pink-500/20"
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: "Prediction Markets",
                    description: "Bet on race outcomes with decentralized prediction protocols and earn rewards.",
                    color: "green",
                    gradient: "from-green-500/20 to-emerald-500/20"
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Yield Farming",
                    description: "Stake your tokens in high-yield farms and earn racing rewards automatically.",
                    color: "yellow",
                    gradient: "from-yellow-500/20 to-orange-500/20"
                  },
                  {
                    icon: <Gauge className="w-8 h-8" />,
                    title: "Analytics Hub",
                    description: "Real-time data and insights to optimize your trading strategy and maximize profits.",
                    color: "red",
                    gradient: "from-red-500/20 to-pink-500/20"
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="feature-card group relative"
                  >
                    {/* Card Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Card Border */}
                    <div className="relative bg-black/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 h-full transition-all duration-500 group-hover:border-gray-600 group-hover:shadow-2xl">
                      
                      {/* Icon */}
                      <div className={`text-${feature.color}-400 mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      {/* CTA */}
                      <motion.a
                        href={`/app${i === 0 ? '/swap' : i === 1 ? '/security' : i === 2 ? '/marketplace' : i === 3 ? '' : i === 4 ? '/swap' : ''}`}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-orange-400 font-medium group-hover:text-orange-300 transition-colors duration-300 cursor-pointer"
                      >
                        Explore <ArrowRight className="w-4 h-4" />
                      </motion.a>
                      
                      {/* Racing Stripe */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-12"
              >
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Racing at <span className="text-orange-400">Light Speed</span>
                  </h3>
                  <p className="text-gray-400">Join thousands of traders already on the track</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 text-center">
                  {[
                    { value: "$2.4M+", label: "Total Value Locked", color: "orange" },
                    { value: "150K+", label: "Trades Executed", color: "red" },
                    { value: "12K+", label: "Active Traders", color: "blue" },
                    { value: "99.9%", label: "Uptime", color: "green" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="group"
                    >
                      <div className={`text-4xl font-black text-${stat.color}-400 mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-5xl font-black text-white mb-8">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Race?</span>
                </h3>
                
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                  Join the fastest-growing DeFi protocol. Experience trading at the speed of Formula 1.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(255, 135, 0, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-black font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl"
                  >
                    🏎️ Launch App
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 135, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-transparent text-white font-bold text-lg rounded-xl border-2 border-gray-400 hover:border-orange-400 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    📖 Docs <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </AnimatedBackground>
    </div>
  );
};

export default LandingPage;