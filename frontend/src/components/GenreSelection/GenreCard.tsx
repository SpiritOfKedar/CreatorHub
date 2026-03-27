import React from 'react';
import Image from 'next/image';

type GenreCardProps = {
  title: string;
  imageSrc: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function GenreCard({ title, imageSrc, isSelected, onClick }: GenreCardProps) {
  return (
    <div onClick={onClick} className="flex flex-col gap-[12px] items-start w-full cursor-pointer transition-transform hover:-translate-y-1 active:scale-[0.98] group relative">
      <div className={`relative w-full aspect-[421/174] rounded-[16px] overflow-hidden transition-all duration-300 ${isSelected ? 'ring-4 ring-[#ff9465] ring-offset-2 ring-offset-[#f6f4f1]' : 'shadow-sm'}`}>
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          className={`absolute object-cover w-full h-full transition-all duration-500 group-hover:scale-105 ${isSelected ? '' : 'group-hover:opacity-90'}`}
        />
      </div>
      <p className={`font-[family-name:var(--font-figtree)] font-semibold leading-[33.6px] text-[#1a1a1a] text-[23px] tracking-[0.46px] transition-colors ${isSelected ? 'text-[#ff9465]' : ''} shrink-0`}>
        {title}
      </p>
    </div>
  );
}
