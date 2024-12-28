'use client';
import { useState, useEffect } from "react";
import { auth } from '@/app/firebase/clientApp';
import Banner from './components/Banner/index';
import AboutUs from './components/About Us/AboutUs';
import StatsSection from './components/StatsSection/StatSection';
import ServicesGrid from './components/ServicesGrid/ServicesGrid';
import CoursesGrid from './components/Courses/CoursesGrid';
import ContactUs from './components/Contact/ContactUs';

// Page component for the entire content
const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Set to true if user exists
      setIsLoading(false); // Set loading to false after checking authentication
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <main>
      <Banner isAuthenticated={isAuthenticated} />
      <AboutUs />
      <StatsSection />
      <ServicesGrid />
      <CoursesGrid />
      <ContactUs />
    </main>
  );
};
export default Page;