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
                        <p className="text-lg sm:text-xl font-semibold text-gray-900">
                          Registration Successful!
                        </p>
                      </div>
                    ) : (
                      <div>
                        {/* Registration Form */}
                        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                          Register your account
                        </h2>
                        {error && (
                          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                            {error}
                          </div>
                        )}
                        <form className="mt-6 space-y-4 sm:space-y-6" onSubmit={handleEmailRegistration}>
                          <div className="space-y-2">
                            <input
                              id="email-address"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500"
                            />
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              required
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-full bg-[#8A2BE2] py-2 px-4 text-sm font-medium text-white hover:bg-[#7B27CC] disabled:opacity-50"
                          >
                            {isLoading ? 'Registering...' : 'Register Now'}
                          </button>
                        </form>
                        <button
                          onClick={handleGoogleSignUp}
                          className="mt-4 w-full flex justify-center gap-3 rounded-full border bg-white px-4 py-2 text-sm font-medium text-gray-700"
                        >
                          Sign up with Google
                        </button>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Register;
