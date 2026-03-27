import Image from 'next/image';

interface ReviewCardProps {
  avatarSrc: string;
  name: string;
  reviewText: string;
  timeAgo: string;
  repliesCount: number;
}

export default function ReviewCard({ avatarSrc, name, reviewText, timeAgo, repliesCount }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <div className="flex gap-[8px] items-center">
        <div className="relative size-[40px] shrink-0 rounded-full overflow-hidden">
          <Image src={avatarSrc} alt={name} fill className="object-cover" />
        </div>
        <p className="font-['Figtree',sans-serif] font-bold leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px]">
          {name}
        </p>
      </div>
      
      <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#5a5a5a] text-[13px] tracking-[0.26px] w-[min-content] min-w-full">
        {reviewText}
      </p>
      
      <div className="flex gap-[15px] items-start">
        <div className="flex items-center justify-center">
          <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#9a9a9a] text-[13px] tracking-[0.26px]">
            {timeAgo}
          </p>
        </div>
        
        <div className="flex items-center justify-center cursor-pointer hover:underline">
          <p className="font-['Source_Sans_Pro',sans-serif] font-semibold text-[14px] text-[#9a9a9a]">
            View replies ( {repliesCount} )
          </p>
        </div>
        
        <div className="flex items-center justify-center cursor-pointer hover:underline">
          <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#5a5a5a] text-[13px] tracking-[0.26px]">
            Reply
          </p>
        </div>
      </div>
    </div>
  );
}
