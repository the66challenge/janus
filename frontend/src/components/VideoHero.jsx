import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, TrendingUp, Shield } from 'lucide-react';
import GradientText from './GradientText';

gsap.registerPlugin(ScrollTrigger);

const VideoHero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  const heroTexts = [
    "RACE INTO THE FUTURE",
    "DEFI AT LIGHT SPEED", 
    "PRECISION TRADING",
    "F1 MEETS WEB3"
  ];

  useEffect(() => {
    // Auto-set loaded state after a short delay
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    const ctx = gsap.context(() => {
      // Initial setup - hide all elements
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 100,
        scale: 0.8
      });

      // Hero entrance timeline
      const tl = gsap.timeline({ delay: 1 });

      // Video overlay fade in
      tl.to(overlayRef.current, {
        opacity: 0.7,
        duration: 2,
        ease: "power2.out"
      })
      // Title dramatic entrance
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(2)",
      }, "-=1")
      // Subtitle slide up
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      // CTA buttons appear
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.5");

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 15,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Scroll-triggered hero exit
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Video zoom and fade
          gsap.to(videoRef.current, {
            scale: 1 + progress * 0.2,
            duration: 0.3
          });

          // Overlay darkness increases
          gsap.to(overlayRef.current, {
            opacity: 0.7 + progress * 0.3,
            duration: 0.3
          });

          // Text moves up and fades
          gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
            y: -progress * 100,
            opacity: 1 - progress * 0.8,
            duration: 0.3
          });
        }
      });

    }, heroRef);

    // Text rotation animation
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 2500);

    return () => {
      ctx.revert();
      clearInterval(textInterval);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* F1 Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => console.warn('Video failed to load:', e)}
        onCanPlayThrough={() => setIsLoaded(true)}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src="/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4" type="video/mp4" />
      </video>

      {/* Fallback F1 Animated Background - Racing Theme (if video fails) */}
      <div
        className="absolute inset-0 w-full h-full racing-bg"
        style={{ display: isLoaded ? 'none' : 'block' }}
      />

      {/* Dynamic Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-900/30 to-red-900/50"
        style={{ opacity: 0 }}
      />

      {/* Racing Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 135, 0, 0.3) 25%, rgba(255, 135, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(255, 135, 0, 0.3) 75%, rgba(255, 135, 0, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 135, 0, 0.3) 25%, rgba(255, 135, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(255, 135, 0, 0.3) 75%, rgba(255, 135, 0, 0.3) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-orange-500/80 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Glass Morphism Container - Ultra Transparent for Video Visibility */}
        <div className="relative backdrop-blur-md bg-gradient-to-br from-black/15 via-black/8 to-black/5 border border-white/15 rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl max-w-6xl mx-6 hover:border-orange-400/40 hover:backdrop-blur-lg transition-all duration-700">
          {/* Glass shine effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/8 via-orange-500/3 to-transparent pointer-events-none"></div>
          
          {/* F1 Racing stripe accents */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-orange-500/80 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent rounded-full"></div>
          
          {/* Corner racing elements */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-400/30 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-400/30 rounded-bl-lg"></div>
          
          <div className="text-center relative z-10">
            {/* Main Title with F1 Typography */}
            <div ref={titleRef} className="mb-6 relative">
              {/* F1 Style Background Text Shadow */}
              <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black leading-none text-white/5 blur-sm scale-105 font-racing">
                JANUS
              </div>
              
              {/* Main JANUS Title */}
              <div className="relative text-6xl md:text-8xl lg:text-9xl font-black leading-none font-racing tracking-wider">
                <GradientText
                  colors={['#FF8700', '#DC0000', '#FF8700', '#E10600', '#FF8700']} 
                  animationSpeed={5}
                  className="text-6xl md:text-8xl lg:text-9xl font-black font-racing tracking-wider drop-shadow-2xl"
                >
                  JANUS
                </GradientText>
              </div>
              
              {/* F1 Style Accent Lines */}
              <div className="absolute -top-2 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
              <div className="absolute -bottom-2 right-0 w-20 h-1 bg-gradient-to-l from-red-500 to-transparent"></div>
              
              {/* Animated Subtitle with F1 Style */}
              <div className="h-16 mt-6 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentText}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Text shadow for better visibility */}
                    <div className="absolute inset-0 text-2xl md:text-4xl font-bold font-f1 text-white/20 blur-sm">
                      {heroTexts[currentText]}
                    </div>
                    
                    <GradientText
                      colors={['#00D2BE', '#FF8700', '#DC0000', '#00D2BE']} 
                      animationSpeed={3}
                      className="text-2xl md:text-4xl font-bold font-f1 tracking-wide drop-shadow-lg relative z-10"
                    >
                      {heroTexts[currentText]}
                    </GradientText>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Subtitle with Enhanced Visibility */}
            <div ref={subtitleRef} className="mb-12 relative">
              {/* Text background for better readability */}
              <div className="absolute inset-0 bg-black/20 blur-xl rounded-lg"></div>
              
              <p className="text-xl md:text-2xl text-white font-f1 max-w-4xl mx-auto leading-relaxed relative z-10 px-6 py-4 drop-shadow-2xl">
                Experience the <span className="text-orange-400 font-bold bg-black/30 px-2 py-1 rounded">fastest DeFi protocol</span> on the blockchain. 
                <br className="hidden md:block" />
                Trade with the <span className="text-red-400 font-bold bg-black/30 px-2 py-1 rounded">precision of Formula 1</span> racing.
              </p>
              
              {/* Racing accent lines */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
            </div>

            {/* Enhanced CTA Buttons with F1 Style */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <motion.a
                href="/app"
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: "0 0 40px rgba(255, 135, 0, 0.6)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-lg rounded-xl border-2 border-orange-400 transition-all duration-300 hover:border-orange-300 cursor-pointer text-center font-racing tracking-wider shadow-2xl overflow-hidden group"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative z-10 drop-shadow-lg">🏎️ ENTER THE RACE</span>
              </motion.a>
              
              <motion.a
                href="/app/marketplace"
                whileHover={{ 
                  scale: 1.08,
                  backgroundColor: "rgba(255, 135, 0, 0.15)",
                  borderColor: "#FF8700",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-5 bg-black/30 backdrop-blur-md text-white font-black text-lg rounded-xl border-2 border-white/40 hover:border-orange-400 transition-all duration-300 cursor-pointer text-center font-racing tracking-wider shadow-2xl overflow-hidden group"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10 drop-shadow-lg">📊 VIEW MARKETPLACE</span>
              </motion.a>
            </div>

            {/* Enhanced Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Zap className="w-8 h-8" />, text: "Lightning Fast Swaps", color: "orange", accent: "#FF8700" },
                { icon: <TrendingUp className="w-8 h-8" />, text: "Optimal Trading", color: "red", accent: "#DC0000" },
                { icon: <Shield className="w-8 h-8" />, text: "MEV Protected", color: "blue", accent: "#00D2BE" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 + i * 0.2, duration: 0.6 }}
                  className="relative flex items-center justify-center gap-3 text-white hover:text-white transition-all duration-300 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/30 group"
                >
                  {/* Feature glow effect */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: feature.accent }}
                  ></div>
                  
                  <div 
                    className="relative z-10 drop-shadow-lg"
                    style={{ color: feature.accent }}
                  >
                    {feature.icon}
                  </div>
                  <span className="font-bold font-f1 relative z-10 drop-shadow-lg text-sm md:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div className="flex flex-col items-center text-gray-400 hover:text-orange-400 transition-colors duration-300">
          <span className="text-sm uppercase tracking-wider mb-2">Scroll to Explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-white text-lg">Loading F1 Experience...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoHero;