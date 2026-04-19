/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import WeatherDisplay from './components/WeatherDisplay';
import LandingView from './components/LandingView';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="antialiased selection:bg-white/20 bg-editorial-bg min-h-screen">
      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingView onStart={() => setShowDashboard(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherDisplay onBack={() => setShowDashboard(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
