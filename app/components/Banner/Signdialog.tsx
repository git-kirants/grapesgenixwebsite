'use client';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { signInWithEmailAndPassword } from "firebase/auth";

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
            const { doc, setDoc, getDoc } = await import("firebase/firestore");
            
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Use user.email as the documentId in Firestore
            const userRef = doc(db, "users", user.email || user.uid); // Use email or fallback to uid
            const userSnap = await getDoc(userRef);

            // If user doesn't exist, add them to the users collection
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                });
            }

            closeModal();
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!auth || !db) return;

        try {
            // Authenticate using email and password
            const { user } = await signInWithEmailAndPassword(auth, email, password);
          
            // Check if the user exists in Firestore using their UID
            const { doc, getDoc } = await import("firebase/firestore");
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
          
            if (!userSnap.exists()) {
              setError('User not found in the database.');
              return;
            }
          
            // Successfully logged in
            console.log("User data:", userSnap.data());
            closeModal();
          } catch (error: any) {
            console.error("Error during email login:", error);
          
            // Provide a more user-friendly error message
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
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                <div className='hidden lg:block'>
                    <button 
                        type="button" 
                        className='mr-2 text-lg text-[#8A2BE2] font-medium hover:bg-[#8A2BE2] hover:text-white transition duration-300 ease-in-out rounded-full py-5 px-16 border border-[#8A2BE2] bg-white'
                        onClick={openModal}
                    >
                        Log In
                    </button>
                </div>
            </div>
            
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all min-h-[500px]">
                                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-md space-y-8">
                                            <div>
                                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                    Sign in to your account
                                                </h2>
                                            </div>
                                            <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
                                                <input type="hidden" name="remember" defaultValue="true" />
                                                <div className="-space-y-px rounded-md shadow-sm">
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
                                                            className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Email address"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label htmlFor="password" className="sr-only">
                                                            Password
                                                        </label>
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            autoComplete="current-password"
                                                            required
                                                            className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="group relative flex w-full justify-center rounded-full border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                                                    >
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <LockClosedIcon className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                                        </span>
                                                        Sign in
                                                    </button>
                                                </div>
                                            </form>

                                            <div className="mt-6">
                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-gray-300" />
                                                    </div>
                                                    <div className="relative flex justify-center text-sm">
                                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={handleGoogleSignIn}
                                                        className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                                                    >
                                                        <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
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
