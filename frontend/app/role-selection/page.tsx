import React from 'react';
import RoleSelectionContent from '@/src/components/RoleSelection/RoleSelectionContent';
import CoverImage from '@/src/components/RoleSelection/CoverImage';
import { Fjalla_One, Figtree, Lexend } from 'next/font/google';
import type { Metadata } from 'next';

const fjallaOne = Fjalla_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fjalla',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-figtree',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Choose your role | Renown',
  description: 'Select how you want to use the platform.',
};

export default function RoleSelectionPage() {
  return (
    <main className={`bg-[#f6f4f1] min-h-screen p-[24px] md:p-[48px] lg:p-[64px] relative w-full ${fjallaOne.variable} ${figtree.variable} ${lexend.variable}`}>
      <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[64px] items-stretch min-h-[calc(100vh-128px)] w-full max-w-[2000px] mx-auto">
        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <RoleSelectionContent />
        </div>
        
        {/* Right Column Image */}
        <div className="flex-1 w-full lg:w-[50%] min-h-[400px] lg:min-h-auto relative">
          <CoverImage />
        </div>
      </div>
    </main>
  );
}
