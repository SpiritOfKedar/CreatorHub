import React from 'react';
import GenreSelectionHeader from '@/src/components/GenreSelection/GenreSelectionHeader';
import GenreGrid from '@/src/components/GenreSelection/GenreGrid';
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
  weight: ['400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Select Your Genre | CreatorHub',
  description: 'Whatever you into you find it here',
};

export default function GenreSelectionPage() {
  return (
    <main className={`bg-[#f6f4f1] min-h-screen flex items-center justify-center w-full overflow-hidden ${fjallaOne.variable} ${figtree.variable} ${lexend.variable}`}>
       <div className="flex flex-col items-center w-full max-w-[1440px] px-[24px] py-[64px] md:px-[64px] gap-[32px]">
         <GenreSelectionHeader />
         <GenreGrid />
       </div>
    </main>
  );
}
