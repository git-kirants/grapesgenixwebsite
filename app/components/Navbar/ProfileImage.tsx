import React from 'react';
import {User} from 'lucide-react';
const ProfileImage = ({ photoURL }: { photoURL: string | null }) => {
  return (
    <div className="h-10 w-10 rounded-full overflow-hidden">
      {photoURL ? (
        <img src={photoURL} alt="User profile" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-gray-300 flex items-center justify-center">
         <User color= "#aaacaf" />
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
