import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { auth, db, firebaseApp } from '../firebase.config';
import { firebaseErrorMessages } from '../utils/FirebaseErrors';
const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  function handleSubmit() {
    if (!email || !password || !confPass) {
      toast.warn(' enter all the input fields ', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: '#2d3748',
          color: '#e2e8f0',
        },
      });
      return;
    }
    if (password != confPass) {
      toast.warn(' both passwords did not matched  ', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          backgroundColor: '#2d3748',
          color: '#e2e8f0',
        },
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success(' Sign up successful ', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
          },
        });
        const user = res.user;
        user.getIdToken().then((idToken) => {
          localStorage.setItem('authToken', idToken); // Store the ID Token
        });
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err.message);
        const message =
          firebaseErrorMessages[err.code as string] ||
          'an unexpected error occured';
        toast.warn(message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
          },
        });
      });
  }
  return (
    <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-3 sm:p-4">
      <ToastContainer />
      <Card className="w-[90%] sm:w-full max-w-sm bg-slate-900 text-white">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            Sign up
          </CardTitle>
          <CardDescription className="text-sm text-gray-400 text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-3">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="h-9 sm:h-10 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="h-9 sm:h-10 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
            />
            <Input
              onChange={(e) => setConfPass(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="h-9 sm:h-10 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
            />
          </form>
        </CardContent>
        <CardFooter className="p-4 sm:p-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-9 sm:h-10 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
