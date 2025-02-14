import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Input } from './/ui/input';
import { Button } from './ui/button';


const LoginPage = () => {
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-3 sm:p-4">
        <Card className="w-[90%] sm:w-full max-w-sm bg-slate-900 text-white">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-sm text-gray-400 text-center">
              Log into your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Email"
                className="h-9 sm:h-10 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
              />
              <Input
                type="password"
                placeholder="Password"
                className="h-9 sm:h-10 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
              />
              
            </form>
          </CardContent>
          <CardFooter className="p-4 sm:p-6">
            <Button 
              className="w-full h-9 sm:h-10 text-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default LoginPage;