'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { CheckCircle, Menu } from 'lucide-react';
import { auth, db } from '@/firebase/clientApp'; // Import initialized Firebase services
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      setShowSuccess(true);
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

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

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
       <div className="flex flex-col space-y-2 items-start">
            {/* Secondary Button - Sign Up */}
            <button
                onClick={openModal}
                className="w-full sm:w-auto text-base font-medium px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-[#8A2BE2] text-white hover:bg-[#7B27CC] active:scale-[0.98] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
            >
                <span className="flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                </span>
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
                    {/* ... (rest of the modal code remains the same) ... */}
                </Dialog>
            </Transition>
        </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  {showSuccess ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                      <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 animate-bounce" />
                      <p className="text-lg sm:text-xl font-semibold text-gray-900">Registration Successful!</p>
                    </div>
                  ) : (
                    <div className="flex min-h-full items-center justify-center py-6 sm:py-12 px-2 sm:px-4">
                      <div className="w-full max-w-md space-y-6">
                        <div>
                          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                            Register your account
                          </h2>
                        </div>
                        {error && (
                          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                            {error}
                          </div>
                        )}
                        <form className="mt-6 space-y-4 sm:space-y-6" onSubmit={handleEmailRegistration}>
                          <div className="space-y-2 sm:-space-y-px rounded-md shadow-sm">
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
                                className="relative block w-full rounded-md sm:rounded-t-md sm:rounded-b-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm sm:text-base"
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
                                className="relative block w-full rounded-md sm:rounded-b-md sm:rounded-t-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm sm:text-base"
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
                              className="group relative flex w-full justify-center rounded-full border border-transparent bg-Blueviolet py-2 px-4 text-sm sm:text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                              </span>
                              {isLoading ? 'Registering...' : 'Register Now'}
                            </button>
                          </div>
                        </form>

                        <div className="mt-4 sm:mt-6">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-6">
                            <button
                              type="button"
                              onClick={handleGoogleSignUp}
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
