import Image from 'next/image';

export default function ProfileActions() {
  return (
    <div className="flex gap-[8px] items-center shrink-0">
      <button className="bg-[#faf8f5] border border-[#d8d1c7] flex gap-[4px] items-center justify-center px-[12px] py-[8px] rounded-[36px] hover:bg-white transition-colors cursor-pointer">
        <Image src="/assets/creator/share.svg" alt="Share profile" width={20} height={20} className="w-[20px] h-[20px]" />
        <span className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#1a1a1a] text-[13px] tracking-[0.26px]">
          Share profile
        </span>
      </button>

      <button className="bg-[#faf8f5] border border-[#d8d1c7] flex gap-[4px] items-center justify-center px-[12px] py-[8px] rounded-[36px] hover:bg-white transition-colors cursor-pointer">
        <Image src="/assets/creator/diamond.svg" alt="Membership" width={20} height={20} className="w-[20px] h-[20px]" />
        <span className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#1a1a1a] text-[13px] tracking-[0.26px]">
          Membership
        </span>
      </button>

      <button className="bg-[#f95c4b] flex gap-[4px] items-center justify-center px-[12px] py-[8px] border border-transparent rounded-[36px] hover:bg-[#eb5242] transition-colors shadow-sm cursor-pointer">
        <Image src="/assets/creator/envelope.svg" alt="Get in touch" width={20} height={20} className="w-[20px] h-[20px]" />
        <span className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#f6f4f1] text-[13px] tracking-[0.26px]">
          Get in touch
        </span>
      </button>
    </div>
  );
}
