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

export const DrawerItem = ({ children, onClick, icon }: DrawerItemProps) => (
    <button
        onClick={onClick}
        className="w-full flex items-center space-x-4 px-5 py-4 hover:bg-gray-100 active:bg-gray-200 
                 rounded-lg transition-colors duration-200 text-left"
    >
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className="text-gray-800 font-medium">{children}</span>
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        const isInteractive = (e.target as HTMLElement).closest('button, a');
        if (isInteractive) {
            handleClose();
            onItemClick?.();
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={handleClose}
                aria-hidden="true"
            />
            
            {/* Drawer */}
            <div
                className={`fixed inset-y-0 ${position}-0 w-full sm:w-96 bg-white z-50
                    transform transition-transform duration-300 ease-in-out shadow-xl rounded-${position === "left" ? "r" : "l"}-3xl
                    ${isOpen ? "translate-x-0" : position === "left" ? "-translate-x-full" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <Image
                            className="h-10 w-auto"
                            src="/assets/logo/logo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 
                                 transition-colors duration-200"
                        aria-label="Close drawer"
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4" onClick={handleContentClick}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Drawer;
