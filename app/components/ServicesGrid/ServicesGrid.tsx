import React from 'react';
import Image from 'next/image';  // Import Image from next/image

interface Service {
  title: string;
  description: string;
  image: string; // Use a string to represent the image path
}

const ServicesGrid: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Mobile App Development',
      description: 'We build engaging and feature-rich mobile applications for iOS and Android platforms.',
      image: '/assets/mobile-app-development.png',
    },
    {
      title: 'Web Design and Development',
      description: 'We craft modern, responsive websites tailored to your brand’s vision and goals.',
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

  return (
    <section id = "ServiceGrid" className="bg-gradient-to-b from-white to-[#e5ddff] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-Black">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"  // Fills the container
                  objectFit="cover"  // Ensures the image covers the area without distortion
                  className="rounded-t-lg"
                />
              </div>
              {/* Text Content */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
