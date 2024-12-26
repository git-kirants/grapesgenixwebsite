import Banner from './components/Banner/index';
import AboutUs from './components/About Us/AboutUs'
import StatsSection from './components/StatsSection/StatSection';
import ServicesGrid from './components/ServicesGrid/ServicesGrid';
import CoursesGrid from './components/Courses/CoursesGrid';
export default function Home() {
  return (
    <main>
      <Banner />
      <AboutUs />
      <StatsSection />
      <ServicesGrid />
      <CoursesGrid />
    </main>
  )
}
