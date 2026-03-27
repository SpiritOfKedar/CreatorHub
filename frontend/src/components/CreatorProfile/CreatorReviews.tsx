import Image from 'next/image';
import ReviewCard from './ReviewCard';

export default function CreatorReviews() {
  const MOCK_REVIEWS = [
    {
      id: 1,
      avatarSrc: "/assets/creator/ellipse1.png",
      name: "Jane Doe",
      reviewText: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      timeAgo: "5 min ago",
      repliesCount: 20
    },
    {
      id: 2,
      avatarSrc: "/assets/creator/ellipse2.png",
      name: "Jane Doe",
      reviewText: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      timeAgo: "5 min ago",
      repliesCount: 20
    },
    {
      id: 3,
      avatarSrc: "/assets/creator/ellipse3.png",
      name: "Jane Doe",
      reviewText: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      timeAgo: "5 min ago",
      repliesCount: 20
    }
  ];

  return (
    <div className="bg-[#fcfaf7] border-[0.5px] border-[#e4ded2] flex flex-col gap-[24px] items-start justify-center p-[24px] rounded-[12px] w-full max-w-[1116px]">
      
      <div className="flex items-center justify-center">
        <h2 className="font-['Figtree',sans-serif] font-semibold leading-[29.2px] text-[#1a1a1a] text-[19px] tracking-[0.38px]">
          Reviews ( 20,000 )
        </h2>
      </div>

      <div className="flex flex-col gap-[24px] items-start w-full">
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>

      <div className="flex items-center justify-center rounded-[6px] cursor-pointer self-center mt-[12px]">
        <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[13px] text-[#3a3a3a] tracking-[0.26px] underline decoration-solid hover:text-[#f95c4b]">
          Load More
        </p>
      </div>

      <div className="flex gap-[8px] items-center w-full mt-[12px]">
        <div className="bg-[#fcfaf7] border border-[#e4ded2] flex flex-1 gap-[12px] h-[40px] items-center px-[16px] py-[12px] rounded-[32px] shadow-[0_1px_4px_0_rgba(238,238,238,0.25)]">
          <Image src="/assets/creator/emoji-happy.svg" alt="Emoji" width={24} height={24} className="shrink-0 size-[24px]" />
          <input 
            type="text" 
            placeholder="Write a review about this creator" 
            className="flex-1 bg-transparent border-none outline-none font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#1a1a1a] placeholder:text-[#9a9a9a] text-[16px] tracking-[0.32px]"
          />
        </div>
        
        <button className="bg-[#f95c4b] border border-[#e4ded2] flex flex-col h-[40px] items-center justify-center px-[12px] py-[12px] rounded-[32px] shadow-[0_1px_4px_0_rgba(238,238,238,0.25)] shrink-0 cursor-pointer hover:bg-[#eb5242] transition-colors">
          <span className="font-['Figtree',sans-serif] font-bold leading-[25.8px] text-[#faf8f5] text-[16px] text-center tracking-[0.32px] w-[58px]">
            Send
          </span>
        </button>
      </div>

    </div>
  );
}
