'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelectionHeader from './RoleSelectionHeader';
import RoleOptionCard from './RoleOptionCard';
import ContinueButton from './ContinueButton';
import api from '@/src/lib/api';
import { useAuthStore } from '@/src/store/useAuthStore';
import toast from 'react-hot-toast';

export default function RoleSelectionContent() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'fan' | 'creator' | null>(null);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleContinue = async () => {
    if (!selectedRole) return;

    const backendRole = selectedRole === 'fan' ? 'user' : 'creator';
    setLoading(true);

    try {
      const res = await api.patch('/auth/set-role', { role: backendRole });

      if (res.data.success && res.data.user) {
        // Update auth store with new role data
        login(res.data.user);
        toast.success(`Welcome! You're now a ${selectedRole === 'fan' ? 'Fan' : 'Creator'}`);

        // Redirect based on role
        if (backendRole === 'creator') {
          router.push('/creator');
        } else {
          router.push('/user');
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to set role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-[32px] h-full items-center justify-center min-h-px min-w-px relative w-full lg:max-w-[644px] mx-auto lg:mr-0 lg:ml-auto lg:pr-8 xl:pr-16">
      <RoleSelectionHeader />
      
      <div className="flex flex-col gap-[16px] w-full mt-4">
        <RoleOptionCard 
          title="Explore as a Fan"
          description="Discover creators, enjoy exclusive content, and support your favorites."
          isSelected={selectedRole === 'fan'}
          onClick={() => setSelectedRole('fan')}
        />
        
        <RoleOptionCard 
          title="Become a Creator"
          description="Share your content, build your audience, and start earning"
          isSelected={selectedRole === 'creator'}
          onClick={() => setSelectedRole('creator')}
        />
      </div>

      <div className="flex w-full justify-center mt-[16px]">
        <ContinueButton onClick={handleContinue} disabled={!selectedRole || loading} />
      </div>
    </div>
  );
}
