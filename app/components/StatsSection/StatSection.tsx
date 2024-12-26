"use client";

import React, { useEffect, useState } from 'react';
import { Users, FolderGit2, Clock, Brain, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const duration = 2000;

  useEffect(() => {
    const startTime = Date.now();
    const endValue = parseInt(value.replace(/,/g, ''));
    
    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - (startTime + delay);
      
      if (elapsed < 0) {
        requestAnimationFrame(updateCount);
        return;
      }
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setCount(Math.floor(endValue * progress));
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, delay]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-4">
      <div className="relative p-3 bg-gray-100 rounded-lg">
        {/* Icon container with relative position to handle overlay */}
        <div className="absolute rounded-xl inset-0" style={{ backgroundColor: 'rgba(189, 120, 249, 0.4)' }}></div> {/* Light purple overlay with 50% transparency */}
        <Icon className="w-8 h-8 text-gray-600 relative z-10" /> {/* Icon with higher z-index */}
      </div>
        <div>
          <div className="text-sm text-gray-500 font-medium mb-1">{label}</div>
          <div className="text-2xl font-bold text-gray-900">
            {count.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

const StatsSection: React.FC = () => {
  const stats: StatItem[] = [
    { icon: Users, label: 'Happy Clients', value: '232' },
    { icon: FolderGit2, label: 'Projects', value: '521' },
    { icon: Clock, label: 'Hours of Support', value: '1445' },
    { icon: Brain, label: 'Hard Workers', value: '13' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
