'use client';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { LogIn, Menu } from 'lucide-react'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserPlusIcon } from '@heroicons/react/24/outline'; // Outline version
import Image from 'next/image';
const Signin = () => {
    let [isOpen, setIsOpen] = useState(false)
    const [auth, setAuth] = useState<Auth | null>(null)
    const [db, setDb] = useState<Firestore | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const initializeFirebase = async () => {
            const { firebaseApp } = await import("@/firebase/clientApp");
            const { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } = await import("firebase/auth");
            const { getFirestore } = await import("firebase/firestore");
            
            const authInstance = getAuth(firebaseApp);
            const dbInstance = getFirestore(firebaseApp);
            
            setAuth(authInstance);
            setDb(dbInstance);
        };

        initializeFirebase();
    }, []);

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const handleGoogleSignIn = async () => {
        if (!auth || !db) return;
    
        try {
            const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
            const { doc, setDoc, getDoc, collection } = await import("firebase/firestore");
    
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            // Use `uid` as the document ID
            const userRef = doc(collection(db, "users"), user.uid); 
            const userSnap = await getDoc(userRef);
    
            if (!userSnap.exists()) {
                // Create a new document for the user
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                });
            }
    
            // Log a success message
            console.log("Google sign-in successful:", {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });
    
            closeModal(); // Handle UI changes for successful login
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Failed to sign in with Google. Please try again.");
        }
    };
    

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!auth || !db) return;

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const { doc, getDoc } = await import("firebase/firestore");
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
          
            if (!userSnap.exists()) {
              setError('User not found in the database.');
              return;
            }
          
            closeModal();
        } catch (error: any) {
            const friendlyErrorMessage =
              error.code === "auth/user-not-found"
                ? "No account found with this email."
                : error.code === "auth/wrong-password"
                ? "Incorrect password."
                : "An error occurred. Please try again.";
            setError(friendlyErrorMessage);
        }
    };

    return (
        <>
             <div className="flex flex-col space-y-2 items-start">
            {/* Primary Button - Log In */}
            <button 
                onClick={openModal}
                className="w-full sm:w-auto text-base font-medium px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-white text-[#8A2BE2] border-2 border-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white active:scale-[0.98] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
            >
                <span className="flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>Log In</span>
                </span>
            </button>
            </div>
            
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-8 text-left align-middle shadow-xl transition-all">
                                    <div className="flex min-h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-md space-y-6 sm:space-y-8">
                                            <div>
                                                <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                                                    Sign in to your account
                                                </h2>
                                            </div>
                                            <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleEmailSignIn}>
                                                <div className="space-y-3 sm:space-y-4 rounded-md">
                                                    <div>
                                                        <label htmlFor="email-address" className="sr-only">
                                                            Email address
                                                        </label>
                                                        <input
                                                            id="email-address"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            required
                                                            className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm sm:text-base"
                                                            placeholder="Email address"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password" className="sr-only">
                                                            Password
                                                        </label>
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            autoComplete="current-password"
                                                            required
                                                            className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm sm:text-base"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {error && (
                                                    <div className="rounded-md bg-red-50 p-3">
                                                        <p className="text-red-500 text-xs sm:text-sm">{error}</p>
                                                    </div>
                                                )}

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="group relative flex w-full justify-center rounded-full border border-transparent bg-Blueviolet py-2 px-4 text-sm sm:text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                                                    >
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <LockClosedIcon className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                                        </span>
                                                        Sign in
                                                    </button>
                                                </div>
                                            </form>

                                            <div className="mt-4 sm:mt-6">
                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-gray-300" />
                                                    </div>
                                                    <div className="relative flex justify-center text-xs sm:text-sm">
                                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 sm:mt-6">
                            <button
                              type="button"
                              onClick={handleGoogleSignIn}
                              className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-4 py-2 text-sm sm:text-base font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            >
                              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                                <path
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  fill="#34A853"
                                />
                                <path
                                  d="M5.84 13.95c-.29-.84-.44-1.75-.44-2.66s.15-1.82.44-2.66V6.41H2.18c-.29.84-.44 1.75-.44 2.66s.15 1.82.44 2.66l3.66-2.84z"
                                  fill="#FBBC05"
                                />
                                <path
                                  d="M12 3.61c1.5 0 2.8.51 3.83 1.36l2.85-2.85C17.26 1.15 14.8 0 12 0 7.7 0 3.99 2.47 2.18 5.47l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  fill="#EA4335"
                                />
                              </svg>
                              Sign in with Google
                            </button>
                          </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Signin;