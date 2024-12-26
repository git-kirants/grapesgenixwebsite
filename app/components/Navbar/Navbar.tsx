import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '#/', current: true },
  { name: 'Courses', href: '#courses', current: false },
  { name: 'Services', href: '#ServiceGrid', current: false },
  
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [isContactCardOpen, setIsContactCardOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('/');

  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-center">
              {/* LOGO */}
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

              {/* LINKS */}
              <div className="hidden lg:block ml-auto">
                <div className="flex space-x-4 items-center">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? 'underline-links'
                            : 'text-slategray',
                          'px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100'
                        )}
                        aria-current={item.href ? 'page' : undefined}
                      >
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>

            {/* DRAWER FOR MOBILE VIEW */}
            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>

        
      </>
    </Disclosure>
  );
};

export default Navbar;
