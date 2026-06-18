'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Form, TextField, Label, Input, Description, FieldError } from '@heroui/react';
import { ChevronLeft, Envelope, Key, TriangleExclamation, CircleCheck, Eye, EyeSlash } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  



  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {

      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/',
      });

      if (authError) {
        setError(authError.message || 'Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      setSuccess('Welcome back! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.07),transparent_50%)]" />


      <div className="absolute top-6 left-4 sm:left-8 z-10">
        <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-yellow-400 font-medium transition text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <Card className="w-full max-w-md bg-neutral-800/80 backdrop-blur-md border border-neutral-700/50 shadow-2xl p-6 rounded-2xl relative z-10 text-white">
        <Card.Header className="flex flex-col space-y-2 text-center p-0 mb-6">
          <Card.Title className="text-2xl font-black tracking-wider text-white">
            RESELL<span className="text-neutral-900 bg-yellow-400 px-2 py-0.5 rounded ml-1">HUB</span>
          </Card.Title>
          <Card.Description className="text-xs text-gray-400">
            Welcome back! Sign in to manage your smart reselling profile
          </Card.Description>
        </Card.Header>

        <Card.Content className="p-0 space-y-4">

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start space-x-2.5 text-red-400 text-xs">
              <TriangleExclamation className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}


          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-start space-x-2.5 text-green-400 text-xs">
              <CircleCheck className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <Form onSubmit={handleSignIn} className="space-y-4 w-full">

            <TextField className="w-full space-y-1">
              <Label className="text-gray-300 font-medium text-xs pl-1">Email Address</Label>
              <div className="relative">
                <Envelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 focus:border-yellow-400 transition-colors h-11 rounded-xl text-white placeholder:text-gray-500 text-sm pl-11 pr-4 w-full outline-none"
                />
              </div>
              <Description />
              <FieldError />
            </TextField>


            <TextField className="w-full space-y-1">
              <div className="flex justify-between items-center pl-1 pr-1">
                <Label className="text-gray-300 font-medium text-xs">Password</Label>
                <Link href="/auth/forgot-password" className="text-[11px] text-yellow-400/80 hover:text-yellow-400 transition">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
          
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

                <Input
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
       
                  className="bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 focus:border-yellow-400 transition-colors h-11 rounded-xl text-white placeholder:text-gray-500 text-sm pl-11 pr-12 w-full outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-yellow-400 text-neutral-900 p-1.5 rounded-lg transition-colors focus:outline-none shadow-md flex items-center justify-center"
                >
                  {showPassword ? (
                    <EyeSlash className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <Description />
              <FieldError />
            </TextField>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-bold h-11 rounded-xl transition shadow-lg shadow-yellow-400/10 mt-2 text-sm"
            >
              Sign In
            </Button>
          </Form>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-neutral-700"></div>
            <span className="absolute bg-neutral-800 px-3 text-[11px] text-gray-500 uppercase font-semibold tracking-wider">
              Or continue with
            </span>
          </div>


          <Button
            type="button"
            variant="bordered"
            onClick={handleGoogleSignIn}
            className="w-full border-neutral-700 hover:border-gray-400 text-white font-medium h-11 rounded-xl transition text-sm flex items-center justify-center space-x-2 bg-neutral-900/40"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1c-4.3 0-7.9 2.53-9.53 6.22l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </Button>
        </Card.Content>

        <Card.Footer className="flex justify-center p-0 mt-6">
          <p className="text-xs text-gray-400">
            Do not have an account?{' '}
            <Link href="/auth/signup" className="text-yellow-400 font-bold hover:underline transition">
              Sign Up
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}