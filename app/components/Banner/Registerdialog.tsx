'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { CheckCircle } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

const Register = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const initializeFirebase = async () => {
      const { firebaseApp } = await import('@/firebase/clientApp'); // Make sure this file exists and properly initializes Firebase
      setAuth(getAuth(firebaseApp));
      setDb(getFirestore(firebaseApp));
    };

    initializeFirebase();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setShowSuccess(false);
    setError('');
    setEmail('');
    setPassword('');
  };

  const openModal = () => setIsOpen(true);

  const handleEmailRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !db) return;

    setIsLoading(true);
    setError('');

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      setShowSuccess(true);

      // Close modal after showing success animation
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!auth || !db) return;
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userRef = doc(db, 'users', user.uid);
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

      setShowSuccess(true);
      setTimeout(closeModal, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
        <div className="hidden lg:block">
          <button
            className="text-white text-lg font-medium mr-4 py-5 px-16 transition duration-150 ease-in-out rounded-full bg-[#8A2BE2] hover:bg-white hover:text-[#8A2BE2] hover:border hover:border-[#8A2BE2]"
            onClick={openModal}
          >
            Sign up
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-h-[500px]">
                  {showSuccess ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                      <p className="text-xl font-semibold text-gray-900">Registration Successful!</p>
                    </div>
                  ) : (
                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                      <div className="w-full max-w-md space-y-8">
                        <div>
                          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Register your account
                          </h2>
                        </div>
                        {error && (
                          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                            {error}
                          </div>
                        )}
                        <form className="mt-8 space-y-6" onSubmit={handleEmailRegistration}>
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
                                className="relative block w-full appearance-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                                autoComplete="new-password"
                                required
                                className="relative block w-full appearance-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="group relative flex w-full justify-center rounded-full border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                              </span>
                              {isLoading ? 'Registering...' : 'Register Now'}
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
                              onClick={handleGoogleSignUp}
                              className="w-full flex items-center justify-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                              Sign up with Google
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Register;
