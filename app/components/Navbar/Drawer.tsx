import React, { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    position?: "left" | "right";
    onItemClick?: () => void;
}

interface DrawerItemProps {
    children: ReactNode;
    onClick?: () => void;
    icon?: ReactNode;
}

// New DrawerItem component for consistent item styling
export const DrawerItem = ({ children, onClick, icon }: DrawerItemProps) => (
    <button
        onClick={onClick}
        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 
                 rounded-lg transition-colors duration-150 text-left"
    >
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className="text-gray-700 font-medium">{children}</span>
    </button>
);

const Drawer = ({ 
    children, 
    isOpen, 
    setIsOpen, 
    title = "Menu",
    position = "left",
    onItemClick
}: DrawerProps) => {
    const [mounted, setMounted] = useState(false);

    // Debugging: Log drawer open/close state
    useEffect(() => {
        console.log('Drawer isOpen:', isOpen);
    }, [isOpen]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        console.log('Mounted:', mounted);
        if (isOpen) {
            document.body.style.overflow = 'hidden';  // Prevent body scrolling
        } else {
            document.body.style.overflow = 'unset';  // Restore body scrolling
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        console.log('Closing drawer');
        setIsOpen(false);
    };

    // Handle click events inside the drawer
    const handleContentClick = (e: React.MouseEvent) => {
        // Debugging: Log the clicked element
        console.log('Content clicked:', e.target);

        // Check if the clicked element is a button or link
        const isInteractive = (e.target as HTMLElement).closest('button, a');
        if (isInteractive) {
            handleClose();
            onItemClick?.();
        }
    };

    // Use effect to ensure mounted state is set after the first render
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Prevent server-side rendering issues
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-60 transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={handleClose}
                aria-hidden="true"
            />
            
            {/* Drawer */}
            <div
                className={`fixed inset-y-0 ${position}-0 w-full sm:w-96 bg-white z-70
                    transform transition-transform duration-300 ease-out shadow-2xl overflow-hidden
                    ${isOpen ? "translate-x-0" : position === "left" ? "-translate-x-full" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <img
                            className="h-8 w-auto"
                            src="/assets/logo/logo.svg"
                            alt="Logo"
                        />
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 
                                 transition-colors duration-200 touch-manipulation"
                        aria-label="Close drawer"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4 touch-pan-y" onClick={handleContentClick}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Drawer;
