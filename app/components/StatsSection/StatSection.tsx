"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Users, FolderGit2, Clock, Brain, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delay?: number;
  isVisible: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, delay = 0, isVisible }) => {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    
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
        hasAnimated.current = true;
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, delay, isVisible]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative z-0">
      <div className="flex items-center gap-4">
        <div className="relative p-3 bg-gray-100 rounded-lg">
          <div className="absolute rounded-xl inset-0" style={{ backgroundColor: 'rgba(189, 120, 249, 0.4)' }}></div>
          <Icon className="w-8 h-8 text-gray-600 relative" />
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Triggers when 20% of the section is visible
        root: null,     // Use viewport as root
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    { icon: Users, label: 'Happy Clients', value: '232' },
    { icon: FolderGit2, label: 'Projects', value: '521' },
    { icon: Clock, label: 'Hours of Support', value: '1445' },
    { icon: Brain, label: 'Hard Workers', value: '13' },
  ];

  return (
    <section ref={sectionRef} className="py-16 px-4 relative z-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              delay={index * 200}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;