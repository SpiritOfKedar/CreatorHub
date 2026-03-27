export default function PostDetails() {
  return (
    <div className="flex flex-col gap-[16px] items-start w-full max-w-[1119px] shrink-0 mt-[20px]">
      
      {/* Early Join Bonus */}
      <div className="flex flex-col gap-[4px] items-start w-full">
        <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#3a3a3a] text-[13px] tracking-[0.26px]">
          Early Join Bonus
        </p>
        <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#f95c4b] text-[13px] tracking-[0.26px]">
          Enroll before March 28 and get a free personalized diet checklist.
        </p>
      </div>

      {/* About The Event */}
      <div className="flex flex-col gap-[8px] items-start w-full mt-[8px]">
        <h3 className="font-['Figtree',sans-serif] font-semibold leading-[29.2px] text-[#3a3a3a] text-[19px] tracking-[0.38px]">
          About The Event
        </h3>
        <div className="flex flex-col gap-[12px] font-['Figtree',sans-serif] font-medium text-[#5a5a5a] text-[16px] tracking-[0.32px] w-full">
          <p className="leading-[25.8px] m-0">If you’ve been trying to lose weight but keep falling off track, this challenge is designed to finally make things simple, structured, and achievable.</p>
          <p className="leading-[25.8px] m-0">The 30-Day Home Fat Loss Challenge is a complete transformation program built for beginners, working professionals, and anyone who wants results without complicated gym routines or strict dieting. This isn’t just a workout plan — it’s a guided system that helps you stay consistent every single day. You’ll follow a day-by-day schedule that includes short, effective workouts combined with practical nutrition guidance. Each workout is designed to burn fat, improve stamina, and gradually build strength — all from the comfort of your home.</p>
          <p className="leading-[25.8px] m-0">Along with fitness, the program focuses on building sustainable habits. You’ll learn how to manage your meals, control cravings, and stay motivated even on busy days.</p>
          <p className="leading-[25.8px] m-0">To keep you engaged, the challenge includes progress tracking tools, weekly check-ins, and a supportive private community where you can interact with others on the same journey.</p>
          <p className="leading-[25.8px] m-0">By the end of 30 days, you won’t just see physical changes you’ll build a routine that you can continue long after the challenge ends.</p>
        </div>
      </div>

      {/* Who This Is For */}
      <div className="flex flex-col gap-[8px] items-start w-full mt-[16px]">
        <h3 className="font-['Figtree',sans-serif] font-semibold leading-[29.2px] text-[#3a3a3a] text-[19px] tracking-[0.38px]">
          Who This Is For
        </h3>
        <ul className="list-disc font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#5a5a5a] text-[16px] tracking-[0.32px] ml-[24px]">
          <li>Beginners who don’t know where to start</li>
          <li>People who prefer home workouts</li>
          <li>Busy individuals with limited time</li>
          <li>Anyone struggling with consistency and motivation</li>
        </ul>
      </div>

      {/* What You'll Get */}
      <div className="flex flex-col gap-[8px] items-start w-full mt-[16px]">
        <h3 className="font-['Figtree',sans-serif] font-semibold leading-[29.2px] text-[#3a3a3a] text-[19px] tracking-[0.38px]">
          What You’ll Get
        </h3>
        <ul className="list-disc font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#5a5a5a] text-[16px] tracking-[0.32px] ml-[24px]">
          <li>30 days of guided workout videos (20–30 mins each)</li>
          <li>Beginner-friendly diet plans (veg & non-veg)</li>
          <li>Weekly live Q&A sessions with the coach</li>
          <li>Downloadable progress tracker</li>
          <li>Access to private community group</li>
          <li>Tips on mindset, discipline, and routine building</li>
        </ul>
      </div>

    </div>
  );
}
