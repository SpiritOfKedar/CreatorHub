import Image from 'next/image';
import React from 'react';

export default function CoverImage() {
  return (
    <div className="border border-[#e4ded2] border-solid flex-1 h-full min-h-[400px] lg:min-h-px min-w-px relative rounded-[16px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[#faf8f5] inset-0 rounded-[16px]" />
        <Image 
          alt="Diverse fans making hand shapes towards the sky" 
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop" 
          fill
          className="absolute object-cover rounded-[16px] size-full object-center"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
