import Image from 'next/image';
import Link from 'next/link';

export default function RelatedCreators() {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full max-w-[1119px] shrink-0 mt-[40px]">
      
      <h3 className="font-['Figtree',sans-serif] font-semibold leading-[29.2px] text-[#3a3a3a] text-[19px] tracking-[0.38px]">
        Creators As Per Your Interests
      </h3>

      <div className="flex flex-col gap-[16px] w-full mt-[8px]">
        
        {/* Creator Card 1 */}
        <div className="bg-[#fcfaf7] border-[0.5px] border-[#e4ded2] shadow-[0_4px_4px_rgba(228,222,210,0.25)] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
          
          <div className="flex gap-[12px] items-start">
            <div className="w-[60px] h-[60px] rounded-[8px] relative shrink-0">
              <Image src="/assets/creator/avatar.png" alt="Creator Name" fill className="object-cover rounded-[8px]" />
            </div>
            <div className="flex flex-col gap-[4px] font-['Figtree',sans-serif] font-medium justify-center">
              <p className="text-[16px] leading-[25.8px] text-[#1a1a1a] tracking-[0.32px] m-0">Creator Name</p>
              <p className="text-[13px] leading-[18.3px] text-[#3a3a3a] tracking-[0.26px] m-0">Content category name</p>
            </div>
          </div>

          <div className="flex flex-col gap-[4px] w-full">
            <p className="font-['Comfortaa',sans-serif] font-semibold text-[13px] leading-[18.3px] text-[#3a3a3a] tracking-[0.26px]">
              Services
            </p>
            <div className="flex gap-[8px] items-center flex-wrap">
              {['Videos', 'Posts', 'Memberships', 'Subscriptions', 'Livestream'].map((service) => (
                <div key={service} className="bg-[#fcfaf7] border border-[#e4ded2] rounded-[32px] px-[8px] py-[4px] shadow-[0_1px_4px_rgba(238,238,238,0.25)] flex items-center justify-center">
                  <span className="font-['Comfortaa',sans-serif] font-normal text-[11px] leading-[0px] h-[16px] flex items-center text-[#5a5a5a] tracking-[0.22px] m-0 pt-[2px]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-[12px] overflow-hidden w-full mt-[4px]">
            {/* Horizontal thumbnail scroll */}
            <div className="w-[200px] h-[140px] relative shrink-0 rounded-[8px]">
              <Image src="/assets/creator/post1.png" alt="Asset" fill className="object-cover rounded-[8px]" />
            </div>
            <div className="w-[200px] h-[140px] relative shrink-0 rounded-[8px]">
              <Image src="/assets/creator/post1.png" alt="Asset" fill className="object-cover rounded-[8px]" />
            </div>
            <div className="w-[200px] h-[140px] relative shrink-0 rounded-[8px]">
              <Image src="/assets/creator/post1.png" alt="Asset" fill className="object-cover rounded-[8px]" />
            </div>
          </div>

        </div>

        {/* Creator Card 2 */}
        <div className="bg-[#faf8f5] border border-[#e4ded2] shadow-[0_4px_4px_rgba(228,222,210,0.25)] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
          
          <div className="flex gap-[12px] items-start">
            <div className="w-[60px] h-[60px] rounded-[8px] relative shrink-0">
              <Image src="/assets/creator/avatar.png" alt="Creator Name" fill className="object-cover rounded-[8px]" />
            </div>
            <div className="flex flex-col gap-[4px] font-['Figtree',sans-serif] font-medium justify-center">
              <p className="text-[16px] leading-[25.8px] text-[#1a1a1a] tracking-[0.32px] m-0">Creator Name</p>
              <p className="text-[13px] leading-[18.3px] text-[#3a3a3a] tracking-[0.26px] m-0">Content category name</p>
            </div>
          </div>

          <div className="flex flex-col gap-[4px] w-full">
            <p className="font-['Comfortaa',sans-serif] font-semibold text-[13px] leading-[18.3px] text-[#3a3a3a] tracking-[0.26px]">
              Services
            </p>
            <div className="flex gap-[8px] items-center flex-wrap">
              {['Videos', 'Posts', 'Memberships', 'Subscriptions', 'Livestream'].map((service) => (
                <div key={service} className="bg-[#faf8f5] border border-[#e4ded2] rounded-[32px] px-[8px] py-[4px] shadow-[0_1px_4px_rgba(238,238,238,0.25)] flex items-center justify-center">
                  <span className="font-['Comfortaa',sans-serif] font-normal text-[11px] leading-[0px] h-[16px] flex items-center text-[#5a5a5a] tracking-[0.22px] m-0 pt-[2px]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-[12px] overflow-hidden w-full mt-[4px]">
            <div className="w-[200px] h-[140px] relative shrink-0 rounded-[8px]">
              <Image src="/assets/creator/post1.png" alt="Asset" fill className="object-cover rounded-[8px]" />
            </div>
            <div className="w-[200px] h-[140px] relative shrink-0 rounded-[8px]">
              <Image src="/assets/creator/post1.png" alt="Asset" fill className="object-cover rounded-[8px]" />
            </div>
            <div className="w-[200px] h-[140px] relative shrink-0 rounded-[8px]">
              <Image src="/assets/creator/post1.png" alt="Asset" fill className="object-cover rounded-[8px]" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
