import Image from 'next/image';

export default function PostHeroImage() {
  return (
    <div className="h-[340px] relative rounded-[16px] w-full max-w-[1119px] shrink-0 mt-[20px]">
      <Image 
        src="/assets/creator/post1.png" 
        alt="Post Cover Image" 
        fill 
        className="object-cover opacity-80 rounded-[16px]" 
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/15 rounded-[16px]" />
    </div>
  );
}
