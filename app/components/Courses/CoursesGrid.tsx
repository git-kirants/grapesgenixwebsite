'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  hours: number;
  image: string;
  description: string;
}

const CoursesGrid: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const data: Course[] = [
      {
        id: "1",
        title: "Introduction to Web Development",
        hours: 40,
        image: "/assets/courses/web-development.jpg",
        description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript."
      },
      {
        id: "2",
        title: "Advanced React & Next.js",
        hours: 35,
        image: "/assets/courses/react-nextjs.jpg",
        description: "Master React.js and Next.js by building real-world applications."
      },
      {
        id: "3",
        title: "Full Stack Development",
        hours: 60,
        image: "/assets/courses/full-stack.jpg",
        description: "Become a full stack developer with Node.js, Express, and MongoDB."
      },
      {
        id: "4",
        title: "UI/UX Design Principles",
        hours: 30,
        image: "/assets/courses/ui-ux-design.jpg",
        description: "Learn design thinking and create beautiful user interfaces."
      }
    ];
    setCourses(data);
  }, []);

  const handleApply = (courseId: string) => {
    console.log(`Applied for course: ${courseId}`);
  };

  return (
    <section id="CoursesGrid" className="bg-gradient-to-b from-[#e5ddff] to-[#f7f4ff] py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-black">
          Our Courses
        </h2>
        
        {/* Grid container with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image container with aspect ratio */}
              <div className="relative w-full pt-[56.25%]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 
                         (max-width: 1024px) 50vw,
                         25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority={course.id === "1"}
                />
              </div>

              {/* Content container with flexible height */}
              <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-purple-900 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>
                
                <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
                  {course.description}
                </p>

                {/* Footer section */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-purple-600 text-sm sm:text-base">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.hours} hours</span>
                  </div>
                  
                  <button
                    onClick={() => handleApply(course.id)}
                    className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-[#6b3fa0] 
                             hover:bg-[#5b329b] text-white transition-all duration-300
                             hover:shadow-md active:transform active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;