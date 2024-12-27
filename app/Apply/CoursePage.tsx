
"use client";

import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Clock } from "lucide-react";

interface Lesson {
  title: string;
  duration: string;
  topics: string[];
}

interface Course {
  id: string;
  title: string;
  hours: number;
  image: string;
  description: string;
  lessons: Lesson[];
}

const courseData: Course[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    hours: 40,
    image: "/assets/courses/web-development.jpg",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    lessons: [
      {
        title: "HTML Basics",
        duration: "3 hours",
        topics: ["Tags", "Attributes", "Basic structure"],
      },
      {
        title: "CSS Styling",
        duration: "4 hours",
        topics: ["Selectors", "Box model", "Flexbox/Grid"],
      },
      {
        title: "JavaScript Essentials",
        duration: "5 hours",
        topics: ["Variables", "Functions", "DOM Manipulation"],
      },
    ],
  },
  {
    id: "2",
    title: "Advanced React & Next.js",
    hours: 35,
    image: "/assets/courses/react-nextjs.jpg",
    description: "Master React.js and Next.js by building real-world applications.",
    lessons: [
      {
        title: "React Basics",
        duration: "4 hours",
        topics: ["Components", "State", "Props"],
      },
      {
        title: "Advanced React",
        duration: "6 hours",
        topics: ["Hooks", "Context API", "Performance Optimization"],
      },
      {
        title: "Next.js Essentials",
        duration: "5 hours",
        topics: ["Routing", "API Routes", "Static Generation"],
      },
    ],
  },
];

const CoursePage: React.FC = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const course = courseData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Course not found!</h2>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-[#e5ddff] to-[#f7f4ff] py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Course Header */}
          <div className="relative w-full pt-[40%]">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">{course.title}</h1>
            <div className="flex items-center text-purple-600 text-base sm:text-lg mb-6">
              <Clock className="w-5 h-5 mr-2" />
              <span>{course.hours} hours</span>
            </div>
            <p className="text-gray-700 text-lg sm:text-xl mb-6">{course.description}</p>

            {/* Lessons Section */}
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4">Lessons</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg mb-2">
                    Duration: {lesson.duration}
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 text-base sm:text-lg">
                    {lesson.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
