import Image from 'next/image';

export default function ConnectedLinks() {
  const links = [
    { icon: '/assets/creator/instagram.svg', text: '@khushi123hebhjb' },
    { icon: '/assets/creator/facebook.svg', text: 'hhtpsnjhbdhjbj.com' },
    { icon: '/assets/creator/twitter.svg', text: 'hhtps.twitterbdhb.com' },
    { icon: '/assets/creator/tumblr.svg', text: '@sjjbddb245672.com' }
  ];

  return (
    <div className="flex flex-col gap-[12px] items-start shrink-0">
      <h3 className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px]">
        Connected links
      </h3>
      
      <div className="flex flex-col gap-[8px] items-start w-[225px]">
        {links.map((link, idx) => (
          <a
            key={idx}
            href="#"
            className="bg-[#faf8f5] border border-[#e4ded2] flex gap-[8px] items-center px-[12px] py-[8px] rounded-[32px] w-full hover:bg-white transition-colors focus:ring-2 focus:ring-[#f95c4b] outline-none"
          >
            <Image src={link.icon} alt={link.text} width={20} height={20} className="shrink-0 size-[20px]" />
            <span className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px] truncate">
              {link.text}
            </span>
          </a>
        ))}
      </div>
      
      <button className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#5a5a5a] text-[13px] tracking-[0.26px] hover:text-[#f95c4b] transition-colors bg-transparent border-none cursor-pointer mt-[2px] p-0">
        + Add more
      </button>
    </div>
  );
}
