import React from 'react';
const AboutUs: React.FC = () => {
    return (
        <section id="about-section" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center lg:text-center">
                    
                    <h2 className="text-3xl sm:text-4xl font-semibold text-midnightblue">
                    About Us
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                        GrapesGenix is an initiative with objectives of offering advanced technological solutions in the fields of Information Technology (IT) and Information Technology Enabled Services (ITES). 
                        We specialize in Software Development, Web Designing/Development, Domain Registration/Hosting, Technical Support, Mobile Application Development, Search Engine Optimization, and Software Training.
                    </p>
                    <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                        Our mission is to empower businesses with cutting-edge tools and expertise, ensuring seamless integration of technology into their operations. From creating bespoke software solutions to optimizing online presence, GrapesGenix is your trusted partner in the digital journey.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
