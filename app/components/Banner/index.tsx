import React from 'react';
import { motion } from "framer-motion";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";

interface BannerProps {
  isAuthenticated: boolean;
}

const Banner = ({ isAuthenticated }: BannerProps) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      id="home-section"
      className="bg-gradient-to-b from-lightkblue to-white w-full"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <motion.div
            variants={slideUp}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            <h1 className="text-midnightblue text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#B08BFF] to-[#5A2D8C] text-transparent bg-clip-text">
                GrapesGenix
              </span>{" "}
              Technical Solutions Pvt Ltd
            </h1>

            {!isAuthenticated && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Signdialog />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Registerdialog />
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Right Section (Image) */}
          <motion.div
            variants={slideUp}
            className="flex justify-center lg:justify-end"
          >
            <img
              src="/assets/banner/Girl.svg"
              alt="Banner illustration"
              className="w-full max-w-md lg:max-w-lg h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;