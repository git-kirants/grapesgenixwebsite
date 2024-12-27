import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Image from 'next/image';
import { Home, Book, Briefcase, LucideIcon } from 'lucide-react';
import ProfileImage from './ProfileImage';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon: LucideIcon;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '#/', current: true, icon: Home },
  { name: 'Courses', href: '#CoursesGrid', current: false, icon: Book },
  { name: 'Services', href: '#ServiceGrid', current: false, icon: Briefcase },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const CustomLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} passHref>
      <span onClick={onClick} className="px-3 py-4 text-lg font-normal">
        {children}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('/');
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null); // Store profile photo URL

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoURL(user.photoURL); // Fetch user's profile photo
      } else {
        setPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        setIsProfileDialogOpen(false);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const toggleProfileDialog = () => {
    setIsProfileDialogOpen((prev) => !prev);
  };

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-center">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-20 w-40 lg:hidden object-contain"
                  src={'/assets/logo/logo.svg'}
                  alt="dsign-logo"
                />
                <img
                  className="hidden lg:block h-20 w-40 object-contain"
                  src={'/assets/logo/logo.svg'}
                  alt="dsign-logo"
                />
              </div>

              <div className="hidden lg:block ml-auto">
                <div className="flex space-x-4 items-center">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => setCurrentLink(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? 'underline-links'
                            : 'text-slategray',
                          'flex items-center px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100'
                        )}
                        aria-current={item.href ? 'page' : undefined}
                      >
                        <item.icon size={20} className="mr-2" />
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>

            <div className="ml-4 relative">
              <div
                className="rounded cursor-pointer"
                onClick={toggleProfileDialog}
              >
                <ProfileImage photoURL={photoURL} />
              </div>

              {isProfileDialogOpen && (
                <div className="absolute right-0 mt-2 w-48 p-4 bg-white border rounded shadow z-10">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-red-600 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
