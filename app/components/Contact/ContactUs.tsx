// components/Contact/ContactUs.tsx
import { Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.contact-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom >= 0;
        if (inView) {
          card.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id = "ContactUs" className="py-16 bg-[#f7f4ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700">Contact Us</h2>
          <p className="text-lg text-purple-600 mt-4">
            We're here to assist you. Reach out to us for any inquiries!
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-5xl mx-auto">
          {/* Address Card */}
          <div
            className="contact-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform motion-safe:animate-fade-in w-full"
          >
            <div className="flex items-center space-x-4 text-purple-600">
              <MapPin size={24} />
              <h3 className="text-xl font-semibold">Our Address</h3>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Grapesgenix Technical Solutions, Near Lourdes Church, Next to Nirmalamatha Central School East Fort Thrissur.
            </p>
          </div>

          {/* Email Card */}
          <div
            className="contact-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform motion-safe:animate-fade-in w-full"
          >
            <div className="flex items-center space-x-4 text-purple-600">
              <Mail size={24} />
              <h3 className="text-xl font-semibold">Email Us</h3>
            </div>
            <ul className="mt-4 text-gray-600 text-sm space-y-2">
              <li>mail@grapestechs.com</li>
              <li>info@grapestechs.com</li>
            </ul>
          </div>

          {/* Call Us Card */}
          <div
            className="contact-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform motion-safe:animate-fade-in w-full"
          >
            <div className="flex items-center space-x-4 text-purple-600">
              <Phone size={24} />
              <h3 className="text-xl font-semibold">Call Us</h3>
            </div>
            <ul className="mt-4 text-gray-600 text-sm space-y-2">
              <li>09744112113</li>
              <li>7736563694</li>
              <li>9020209949</li>
              <li>7558049107</li>
              <li>0487-2338800 (10:00AM-5:00PM)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
