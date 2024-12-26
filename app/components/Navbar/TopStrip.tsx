import React from 'react';

const TopStrip: React.FC = () => {
  return (
    <div className="bg-black text-white py-2 text-xs sm:text-sm">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 gap-y-2">
        <span className="block w-full sm:w-auto text-center sm:text-left">
          📞 +91 9020209949, 7736563694 (10:00AM-5:00PM)
        </span>
        <span className="block w-full sm:w-auto text-center sm:text-right">
          ✉️ mail@grapestechs.com
        </span>
      </div>
    </div>
  );
};

export default TopStrip;
