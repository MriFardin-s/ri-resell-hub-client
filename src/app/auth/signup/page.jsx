'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Form, TextField, Label, Input, Description, Radio, RadioGroup, FieldError, ListBoxItem, ListBox, SelectPopover, SelectValue, SelectTrigger, Select } from '@heroui/react';
import { ChevronLeft, Envelope, Key, Person, Plus, TriangleExclamation, CircleCheck, Eye, EyeSlash } from '@gravity-ui/icons';
import { signUp } from '@/lib/auth-client';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('buyer');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        setError('Image size must be less than 5 MB.');
        setImageFile(null);
        setImagePreview('');
        return;
      }

      setError('');
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, contain at least one capital letter, and one number.');
      setIsLoading(false);
      return;
    }

    try {
      let imageUrl = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          body: formData,
        });

        const imgData = await response.json();

        if (imgData.success) {
          imageUrl = imgData.data.url;
        } else {
          setError('Failed to upload profile picture to ImgBB.');
          setIsLoading(false);
          return;
        }
      }

      const { data, error: authError } = await signUp.email({
        email,
        password,
        role,
        name,
        image: imageUrl,
        country,
        address,
        phone,
        callbackURL: callbackUrl, 
      });

      if (authError) {
        setError(authError.message || 'Registration failed. Please check your inputs.');
        setIsLoading(false);
        return;
      }

      if (data) {
        setSuccess('Account created successfully! Redirecting...');
        setError('');
        setIsLoading(false);

        setTimeout(() => {
          router.push(callbackUrl);
        }, 2000);
      }

    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUp.social({
        provider: 'google',
        callbackURL: callbackUrl, 
      });
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 relative overflow-hidden transition-colors">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.07),transparent_50%)]" />

      {/* Back Button */}
      <div className="absolute top-6 left-4 sm:left-8 z-10">
        <Link href="/" className="inline-flex items-center space-x-2 text-neutral-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 font-medium transition text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Form Card */}
      <Card className="w-full max-w-md bg-white/90 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-700/50 shadow-2xl p-6 rounded-2xl relative z-10 text-neutral-900 dark:text-white transition-colors my-12">
        <Card.Header className="flex flex-col space-y-2 text-center p-0 mb-6">
          <Card.Title className="text-2xl font-black tracking-wider text-neutral-900 dark:text-white">
            RESELL<span className="text-neutral-950 bg-yellow-400 px-2 py-0.5 rounded ml-1">HUB</span>
          </Card.Title>
          <Card.Description className="text-xs text-neutral-500 dark:text-gray-400">
            Create your account to join the smart reselling community
          </Card.Description>
        </Card.Header>

        <Card.Content className="p-0 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start space-x-2.5 text-red-600 dark:text-red-400 text-xs">
              <TriangleExclamation className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-start space-x-2.5 text-green-600 dark:text-green-400 text-xs">
              <CircleCheck className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <Form onSubmit={handleSignUp} className="space-y-4 w-full">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center justify-center space-y-2 w-full">
              <label className="relative group cursor-pointer flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-600 hover:border-yellow-400 overflow-hidden transition bg-neutral-100 dark:bg-neutral-900/50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition">
                    <Plus className="w-5 h-5" />
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              <span className="text-[11px] text-neutral-500 dark:text-gray-400 font-medium">Upload Profile Picture (Max 5MB)</span>
            </div>

            {/* Full Name */}
            <TextField className="w-full space-y-1">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Full Name</Label>
              <div className="relative">
                <Person className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-yellow-400/50 focus:border-yellow-400 transition-colors h-11 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 text-sm pl-11 pr-4 w-full outline-none"
                />
              </div>
              <Description />
              <FieldError />
            </TextField>

            {/* Email Address */}
            <TextField className="w-full space-y-1">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Email Address</Label>
              <div className="relative">
                <Envelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-yellow-400/50 focus:border-yellow-400 transition-colors h-11 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 text-sm pl-11 pr-4 w-full outline-none"
                />
              </div>
              <Description />
              <FieldError />
            </TextField>

            {/* Country Select */}
            <Select label="Country" selectedKey={country} onSelectionChange={setCountry} className="w-full" placeholder="Select your country">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Country</Label>
              <SelectTrigger className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 h-11 rounded-xl text-neutral-900 dark:text-white">
                <SelectValue  />
              </SelectTrigger>
              <SelectPopover className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 w-[var(--trigger-width)] rounded-xl mt-1 p-1 shadow-xl">
                <ListBox>
                  <ListBoxItem id="bd" className="text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-lg cursor-pointer">Bangladesh</ListBoxItem>
                  <ListBoxItem id="in" className="text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-lg cursor-pointer">India</ListBoxItem>
                  <ListBoxItem id="us" className="text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-lg cursor-pointer">United States</ListBoxItem>
                  <ListBoxItem id="uk" className="text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2 rounded-lg cursor-pointer">United Kingdom</ListBoxItem>
                </ListBox>
              </SelectPopover>
            </Select>

            {/* Address Text Field */}
            <TextField className="w-full space-y-1">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your street address"
                className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 h-11 rounded-xl text-neutral-900 dark:text-white text-sm px-4 w-full outline-none"
              />
            </TextField>

            {/* Phone Number with Country Code */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Phone Number</Label>
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:border-yellow-400 transition-all h-11">
                <span className="px-3 text-neutral-500 dark:text-gray-400 border-r border-neutral-200 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800/50 h-full flex items-center text-sm">
                  +880
                </span>
                <input
                  type="tel"
                  placeholder="17XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent text-neutral-900 dark:text-white text-sm px-4 w-full h-full outline-none placeholder:text-neutral-400 dark:placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Role</Label>
              <RadioGroup value={role} onValueChange={setRole} orientation="horizontal" className="flex flex-row space-x-6">
                <Radio value="buyer">
                  <Radio.Content className="flex items-center gap-2">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <span className="text-sm font-medium text-neutral-700 dark:text-gray-200 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">
                      Buyer
                    </span>
                  </Radio.Content>
                </Radio>

                <Radio value="seller">
                  <Radio.Content className="flex items-center gap-2">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <span className="text-sm font-medium text-neutral-700 dark:text-gray-200 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">
                      Seller
                    </span>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            {/* Password Field */}
            <TextField className="w-full space-y-1">
              <Label className="text-neutral-700 dark:text-gray-300 font-medium text-xs pl-1">Password</Label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-yellow-400/50 focus:border-yellow-400 transition-colors h-11 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-500 text-sm pl-11 pr-12 w-full outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-200 hover:bg-neutral-300 dark:bg-white dark:hover:bg-yellow-400 text-neutral-900 p-1.5 rounded-lg transition-colors focus:outline-none shadow-sm flex items-center justify-center"
                >
                  {showPassword ? (
                    <EyeSlash className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-[10px] text-neutral-400 dark:text-gray-500 pl-1 pt-0.5">
                Must be at least 8 characters with 1 capital letter and 1 number.
              </p>
              <Description />
              <FieldError />
            </TextField>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-bold h-11 rounded-xl transition shadow-lg shadow-yellow-400/10 mt-2 text-sm"
            >
              Sign Up
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
            <span className="absolute bg-white dark:bg-neutral-800 px-3 text-[11px] text-neutral-400 dark:text-gray-500 uppercase font-semibold tracking-wider transition-colors">
              Or continue with
            </span>
          </div>

          {/* Google Sign Up */}
          <Button
            type="button"
            variant="bordered"
            onClick={handleGoogleSignUp}
            className="w-full border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-gray-400 text-neutral-900 dark:text-white font-medium h-11 rounded-xl transition text-sm flex items-center justify-center space-x-2 bg-neutral-50 dark:bg-neutral-900/40"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1c-4.3 0-7.9 2.53-9.53 6.22l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </Button>
        </Card.Content>

        <Card.Footer className="flex justify-center p-0 mt-6">
          <p className="text-xs text-neutral-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link 
              href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`} 
              className="text-yellow-600 dark:text-yellow-400 font-bold hover:underline transition"
            >
              Sign In
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}