import Banner from './components/Banner/index';
import Companies from './components/Companies/Companies';
import Courses from './components/Courses/index';
import Mentor from './components/Mentor/index';
import Testimonials from './components/Testimonials/index';
import Newsletter from './components/Newsletter/Newsletter';
import AboutUs from './components/About Us/AboutUs'
import StatsSection from './components/StatsSection/StatSection';
import ServicesGrid from './components/ServicesGrid/ServicesGrid';
export default function Home() {
  return (
    <main>
      <Banner />
      <AboutUs />
      <StatsSection />
      <ServicesGrid />
    </main>
  )
}
