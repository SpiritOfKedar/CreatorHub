import Link from 'next/link';

export default function PostHeader() {
  return (
    <div className="flex flex-col gap-[20px] items-start w-full max-w-[1119px] shrink-0">
      
      {/* Back Button */}
      <Link href="/user/creator" className="bg-[#faf8f5] border border-[#d8d1c7] flex gap-[4px] items-center justify-center px-[8px] py-[4px] rounded-[36px] transition-colors hover:bg-[#f6f4f1]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#1a1a1a] text-[16px] tracking-[0.32px]">
          Back
        </span>
      </Link>

      {/* Main Title */}
      <h1 className="font-['Fjalla_One',sans-serif] font-normal leading-[57.6px] text-[#1a1a1a] text-[40px] tracking-[0.8px] w-full max-w-[1116px]">
        Transform your body in just 30 days with simple home workouts and a guided nutrition plan.
      </h1>
      
    </div>
  );
}
