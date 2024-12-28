import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServicesGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      title: 'Mobile App Development',
      description: 'We build engaging and feature-rich mobile applications for iOS and Android platforms.',
      image: '/assets/mobile-app-development.jpg',
    },
    {
      title: 'Web Design and Development',
      description: 'We craft modern, responsive websites tailored to your brands vision and goals.',
      image: '/assets/web-design-and-development.png',
    },
    {
      title: 'Project Guidance',
      description: 'We provide strategic guidance and mentorship to help you achieve project success.',
      image: '/assets/project-guidance.jpg',
    },
    {
      title: 'Software Courses & Internships',
      description: 'Hands-on software development courses and internship opportunities to boost your skills.',
      image: '/assets/software-courses.jpg',
    },
    {
      title: 'Internship Programs',
      description: 'Gain practical experience with our internship programs in development and design.',
      image: '/assets/internship-programs.jpg',
    },
    {
      title: 'Annual Maintenance Contracts',
      description: 'We ensure the smooth operation and upkeep of your software systems year-round.',
      image: '/assets/annual-maintenance.jpg',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.645, 0.045, 0.355, 1]
      }
    }
  };

  return (
    <section id="ServiceGrid" className="bg-gradient-to-b from-white to-[#e5ddff] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold mb-10 text-center text-black"
        >
          Our Services
        </motion.h2>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              <motion.div 
                className="p-6 text-center relative bg-white transition-transform duration-300 ease-out"
              >
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {service.description}
                </p>
                
                {/* Subtle decorative line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-purple-500 group-hover:w-1/4 transition-all duration-300 ease-out" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;