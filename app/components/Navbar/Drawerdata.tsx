import React from "react";
import Link from "next/link";
import Signdialog from '../Banner/Signdialog'; // Correct import path
import Registerdialog from '../Banner/Registerdialog';
import { Home, Book, Briefcase,Phone, LucideIcon  } from 'lucide-react';
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon : LucideIcon;
}


const navigation: NavigationItem[] = [
    { name: 'Home', href: '#/', current: true, icon: Home },
    { name: 'Courses', href: '#CoursesGrid', current: false, icon: Book },
    { name: 'Services', href: '#ServiceGrid', current: false, icon: Briefcase },
    { name: 'Contact', href: '#ContactUs', current: false, icon: Phone },
  ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Data = () => {
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'text-black hover:opacity-100'
                    : 'hover:text-black hover:opacity-100',
                  'flex items-center py-1 text-lg font-normal opacity-75'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {/* Render Icon */}
                <item.icon size={20} className="mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Data;
