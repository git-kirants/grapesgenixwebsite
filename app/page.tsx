'use client';
import { useState, useEffect } from "react";
import { auth } from '@/app/firebase/clientApp';
import { motion, AnimatePresence } from "framer-motion";
import Banner from './components/Banner/index';
import AboutUs from './components/About Us/AboutUs';
import StatsSection from './components/StatsSection/StatSection';
import ServicesGrid from './components/ServicesGrid/ServicesGrid';
import CoursesGrid from './components/Courses/CoursesGrid';
import ContactUs from './components/Contact/ContactUs';

const LoadingDots = () => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: index * 0.2,
          ease: "easeInOut"
        }}
        className="w-2 h-2 bg-grey rounded-full"
      />
    ))}
  </div>
);

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setTimeout(() => setIsLoading(false), 300);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              className="w-16 h-16 border-4 rounded-full"
              style={{
                borderColor: "#B08BFF transparent #5A2D8C transparent"
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <LoadingDots />
          </motion.div>
        </motion.div>
      ) : (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Banner isAuthenticated={isAuthenticated} />
          <AboutUs />
          <StatsSection />
          <ServicesGrid />
          <CoursesGrid />
          <ContactUs />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Page;