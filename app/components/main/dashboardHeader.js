// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\dashboardHeader.js
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const DashboardHeader = () => {
  const [greeting, setGreeting] = useState('');
  const [timeString, setTimeString] = useState('');
  const [stats, setStats] = useState({ activeProjects: 0, tasksToday: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const statsInterval = setInterval(fetchStats, 5 * 60 * 1000);

    const hour = new Date().getHours();
    const getGreeting = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const isWeekend = day === 5 || day === 6; // Friday or Saturday
      
      if (isWeekend) return "IT'S THE WEEKEND BITCH!!";
      
      if (hour >= 15 && hour < 23) { // 3 PM to 11 PM EST
        if (hour < 18) return "Good Afternoon! Time to get to work!";
        if (hour < 21) return "Good Evening! Keep the momentum going!";
        return "Late Night Grind! You're almost there!";
      }
      
      return "Off hours. Time to recharge!";
    };
    setGreeting(getGreeting());
    
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      });
    };
    setTimeString(formatTime());
    
    const timer = setInterval(() => setTimeString(formatTime()), 60000);
    return () => {
      clearInterval(timer);
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[50vh] w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"
      />
      
      <motion.div 
        className="text-center z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl text-gray-600 font-medium mb-4 max-w-2xl mx-auto leading-relaxed">{greeting}</h2>
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Giovanni
        </h1>
        <p className="text-gray-500 text-lg mb-6">{timeString}</p>
        
        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-semibold text-gray-800 mb-2">Active Projects</h3>
            <motion.p 
              key={stats.activeProjects}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-blue-600"
            >
              {stats.activeProjects}
            </motion.p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-semibold text-gray-800 mb-2">Tasks Today</h3>
            <motion.p 
              key={stats.tasksToday}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-purple-600"
            >
              {stats.tasksToday}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
