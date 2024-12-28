import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Clock, X, Calendar, DollarSign, GraduationCap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  hours: number;
  image: string;
  description: string;
  lessons: string[];
  timeDistribution: string;
  fee: string;
}

const CoursesGrid: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedCourse]);

  useEffect(() => {
    // courses data
    const data: Course[] = [
      {
        "id": "course_001",
        "title": "Introduction to Web Development",
        "hours": 40,
        "image": "/assets/courses/web-development.jpg",
        "description": "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course will provide you with the foundation for building static web pages and introduce you to basic web design principles.",
        "lessons": ["Overview of web development", "Introduction to HTML: Structure of a webpage", "Setting up your development environment", "Working with HTML tags and attributes", "Creating forms, links, and embedding media", "Structuring content using semantic tags", "Introduction to CSS and styling elements", "Using selectors, properties, and values", "CSS layout basics: Box model, margin, padding, and border", "Flexbox and CSS Grid for layout design", "Positioning, display properties, and responsiveness", "Media queries and creating responsive web pages", "Basics of JavaScript: Variables, data types, and operators", "Introduction to functions, conditions, and loops", "DOM manipulation using JavaScript", "Working with arrays, objects, and JSON", "Event handling and interactivity", "Form validation using JavaScript", "Advanced DOM manipulation: Adding, removing, and updating elements", "Working with events in JavaScript", "Understanding the event loop and asynchronous JavaScript", "Basics of Git: Version control concepts", "Setting up a Git repository", "Understanding Git commands: Commit, push, pull, merge", "Introduction to code editors and IDEs", "Understanding browser developer tools", "Using browser extensions for debugging and testing", "Project: Building a personal portfolio website", "Implementing HTML, CSS, and JavaScript to build a static website"],
        "timeDistribution": "Theory: 20 hours, Practice: 20 hours",
        "fee": "$199"
      },
      {
        "id": "course_002",
        "title": "Advanced React & Next.js",
        "hours": 35,
        "image": "/assets/courses/react-nextjs.jpg",
        "description": "Master React.js and Next.js by building real-world applications. This course covers advanced React concepts, server-side rendering, and static site generation with Next.js.",
        "lessons": ["Overview of React: Components and JSX", "State and Props", "Functional components vs Class components", "Hooks: useState, useEffect, useContext", "Custom hooks and context API", "Error boundaries and code splitting", "Introduction to Next.js: Pages and Routing", "Static site generation (SSG) vs server-side rendering (SSR)", "Setting up a Next.js project", "Fetching data with getServerSideProps", "Dynamic routing with Next.js", "Understanding SSR vs client-side rendering (CSR)", "Working with getStaticProps and getStaticPaths", "Building static sites with dynamic content", "SEO optimization with static generation", "Introduction to Redux and state management", "Actions, reducers, and the Redux store", "Integrating Redux with React and Next.js", "Fetching data from REST APIs", "Understanding API routes in Next.js", "Handling API errors and loading states", "Implementing authentication in Next.js apps", "Using JWT (JSON Web Tokens) and sessions", "Role-based authorization", "Styled-components, Emotion, and CSS-in-JS", "TailwindCSS and utility-first design", "Server-side styling with Next.js", "Project: Build a full-stack blog with authentication", "Frontend with React and Next.js", "Backend API with Next.js API routes and a database"],
        "timeDistribution": "Theory: 15 hours, Project work: 20 hours",
        "fee": "$299"
      },
      {
        "id": "course_003",
        "title": "Full Stack Development with Node.js, Express, and MongoDB",
        "hours": 60,
        "image": "/assets/courses/full-stack.jpg",
        "description": "Become a full-stack developer with Node.js, Express, and MongoDB. This course takes you through backend and frontend development, from setting up a server to building full-fledged applications.",
        "lessons": ["What is Node.js and why use it?", "Setting up a Node.js server with Express", "Understanding event-driven architecture in Node.js", "Creating APIs with Express", "Understanding middleware and routing in Express", "Error handling and validation", "NoSQL vs SQL databases", "Setting up MongoDB and creating a database", "CRUD operations in MongoDB with Mongoose", "Aggregation framework in MongoDB", "Schema relationships (One-to-many, Many-to-many)", "Validations and indexing in Mongoose", "Principles of REST", "Designing and implementing RESTful APIs with Express and MongoDB", "Authentication and authorization with JWT tokens", "Introduction to Passport.js", "Implementing local and social authentication", "Using sessions and cookies for persistent login", "Introduction to WebSockets and Socket.io", "Real-time messaging and notifications", "Building a chat application with Node.js and Socket.io", "Working with RESTful APIs from the frontend", "Connecting your backend with React or other frontend frameworks", "Handling CORS and HTTP requests", "Deploying your Node.js application on Heroku", "Setting up environment variables", "Configuring MongoDB with Atlas", "Project: Building a full-stack application with Node.js, Express, MongoDB, and React", "Implementing user authentication, data management, and deployment"],
        "timeDistribution": "Backend: 30 hours, Frontend and project work: 30 hours",
        "fee": "$399"
      },
      {
        "id": "course_004",
        "title": "UI/UX Design Principles",
        "hours": 30,
        "image": "/assets/courses/ui-ux-design.jpg",
        "description": "Learn design thinking and create beautiful user interfaces. This course covers key design principles, wireframing, prototyping, and user testing to create a seamless user experience.",
        "lessons": ["What is UI/UX Design? Differences between UI and UX", "Understanding the design process: Research, Ideation, Prototyping, and Testing", "Tools and software for UI/UX designers", "Introduction to Design Thinking", "Conducting user research and creating personas", "User journeys and mapping out workflows", "Introduction to wireframing and low-fidelity prototypes", "Creating wireframes using tools like Figma, Sketch, and Adobe XD", "Best practices for wireframing", "Creating interactive prototypes for user testing", "Using Figma/Adobe XD to create high-fidelity prototypes", "Prototype testing and feedback loops", "Color theory, typography, and layout", "Principles of contrast, balance, and hierarchy", "Accessibility considerations in UI design", "Mobile-first design approach", "Responsive design and adaptive layouts", "Designing for different screen sizes and devices", "Introduction to usability testing and A/B testing", "Gathering user feedback through usability tests", "Analyzing test results and iterating on designs", "Overview of popular UI/UX design tools (Figma, Sketch, Adobe XD)", "Hands-on practice: Designing a simple app interface", "Design collaboration tools and working in teams", "Best practices for handing off designs to developers", "Understanding developer handoff tools like Zeplin and Figma", "Communication between designers and developers", "Creating a professional portfolio showcasing your UI/UX work", "Projects to include in your portfolio", "Tips for presenting your work to clients or employers"],
        "timeDistribution": "Theory: 15 hours, Hands-on design: 15 hours",
        "fee": "$149"
      }
  ];
  setCourses(data);
}, []);

  const handleApply = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course || null);
  };

  const closeWidget = () => setSelectedCourse(null);

  return (
    <section id="CoursesGrid" className="bg-gradient-to-b from-[#e5ddff] to-[#f7f4ff] py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-black">
          Our Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
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

              <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-purple-900 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
                  {course.description}
                </p>

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

      {selectedCourse && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative flex flex-col h-[90vh] overflow-hidden">
      {/* Close button */}
<button
  onClick={closeWidget}
  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 
             text-white transition-all duration-300 hidden sm:block"
>
  <X className="w-5 h-5" />
</button>


      {/* Hero section with image and overlay - Added overflow-hidden and rounded corners */}
      <div className="relative h-40 sm:h-48 w-full flex-shrink-0 rounded-t-2xl overflow-hidden">
        <Image
          src={selectedCourse.image}
          alt={selectedCourse.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-4 left-6 right-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {selectedCourse.title}
          </h3>
        </div>
      </div>

            {/* Content section */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-6">
                {/* Course highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Duration</p>
                      <p className="text-gray-900">{selectedCourse.hours} hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Course Fee</p>
                      <p className="text-gray-900">{selectedCourse.fee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Distribution</p>
                      <p className="text-gray-900">{selectedCourse.timeDistribution}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">About This Course</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                </div>

                {/* Lessons */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    Course Curriculum
                  </h4>
                  <ul className="grid gap-2">
                    {selectedCourse.lessons.map((lesson, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm text-purple-600 font-medium">{index + 1}</span>
                        </span>
                        <span className="text-gray-700">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

{/* Footer with action button */}
<div className="p-4 border-t border-gray-100 flex-shrink-0 block lg:hidden">
  <button
    onClick={closeWidget}
    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#6b3fa0] hover:bg-[#5b329b] 
             text-white font-medium transition-all duration-300 hover:shadow-lg"
  >
    Close
  </button>
</div>


          </div>
        </div>
      )}
    </section>
  );
};

export default CoursesGrid;