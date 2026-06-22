'use client';

import React, { useState, useEffect } from 'react';
import { Card } from "@heroui/react";
import { toast } from 'react-hot-toast';
import { CircleDashed } from '@gravity-ui/icons'; 
import { useSession, authClient } from '@/lib/auth-client'; 
import { changeEmail } from '@/lib/actions/changeEmail';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [mounted, setMounted] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: '',
    image: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        image: user.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256',
      });
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file!");
      return;
    }

    try {
      setIsUploadingImg(true);

      const imgFormData = new FormData();
      imgFormData.append('image', file);

      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imgFormData,
      });

      const imgData = await response.json();

      if (imgData.success) {
        setProfileData((prev) => ({ ...prev, image: imgData.data.url }));
        toast.success("Profile picture uploaded to ImgBB successfully!");
      } else {
        toast.error('Failed to upload profile picture to ImgBB.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred during image upload.');
    } finally {
      setIsUploadingImg(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("User email not found!");
      return;
    }

    try {
      setIsUpdatingProfile(true);
      const res = await changeEmail({
        email: user.email,
        ...profileData
      });
      
      if (res?.success) {
        toast.success("Profile information updated successfully!");
        window.location.reload(); 
      } else {
        toast.error(res?.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("Failed to update profile. Try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };


  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      setIsUpdatingPassword(true);


      const { data, error } = await authClient.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        revokeOtherSessions: true, 
      });
      
      if (error) {
       
        toast.error(error.message || "Error changing password. Check your current password.");
        return;
      }

      toast.success("Password changed successfully!");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (!mounted || isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <CircleDashed className="w-8 h-8 text-yellow-500 animate-spin" />
        <p className="text-sm font-medium text-neutral-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Profile Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
          Manage your personal information, contact details, and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
            <p className="text-xs text-gray-400">Update your basic profile info and avatar image URL.</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-neutral-800/30 p-4 rounded-xl">
              <div className="relative w-16 h-16">
                <img
                  src={profileData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256'}
                  alt="Profile Preview"
                  className={`w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-neutral-700 transition-opacity ${isUploadingImg ? 'opacity-40' : 'opacity-100'}`}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256";
                  }}
                />
                
                
                <label className="absolute bottom-0 right-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 w-5 h-5 rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform flex items-center justify-center border border-gray-200 dark:border-neutral-700">
                  {isUploadingImg ? (
                    <CircleDashed className="w-3 h-3 animate-spin text-yellow-500" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploadingImg}
                  />
                </label>
              </div>

              <div className="w-full space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Profile Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={profileData.image || ''}
                  onChange={handleProfileChange}
                  className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium"
                  placeholder="e.g. +8801XXXXXXXXX"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivery Address</label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                rows={3}
                className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium"
                placeholder="Enter your detailed shipping/billing address..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow transition flex items-center gap-2"
              >
                {isUpdatingProfile && <CircleDashed className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security Settings</h2>
            <p className="text-xs text-gray-400">Change your password to keep your account safe.</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full text-sm p-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow transition flex items-center gap-2"
              >
                {isUpdatingPassword && <CircleDashed className="w-4 h-4 animate-spin" />}
                Change Password
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}