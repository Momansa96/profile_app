import React from "react";
import Image from "next/image";
interface ProfileBadgeProps {
  totalUsers: number; 
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ totalUsers }) => {
  return (
    <div className="flex items-center space-x-3 px-6">
      <div className="flex -space-x-2 ">
        <Image
          src="/Avatar1.jpg"
          width={4}
          height={4}
          alt="Avatar 1"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
        <Image
          src="/Avatar2.jpg"
          width={4}
          height={4}
          alt="Avatar 2"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
        <Image
          src="/Avatar3.jpg"
          width={4}
          height={4}
          alt="Avatar 3"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
        <Image
          src="/Avatar4.jpg"
          width={4}
          height={4}
          alt="Avatar 4"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
        <Image
          src="/Avatar5.jpg"
          width={4}
          height={4}
          alt="Avatar 5"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </div>
      <span className="text-gray-600 text-sm lowercase">
        +{totalUsers} personnes l&apos;utilisent
      </span>
    </div>
  );
};

export default ProfileBadge;
