"use client";

import React from 'react';
import { MessageSquare, Smile } from 'lucide-react';

export default function LivestreamComments() {
  // Static placeholder data matching Figma structure
  const comments = [
    {
      id: 1,
      name: "Jane Doe",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop",
      text: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      timeRemaining: "5 min ago",
      replies: [
        {
          id: 101,
          name: "Jane Doe",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop",
          text: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          timeRemaining: "5 min ago"
        },
        {
          id: 102,
          name: "Jane Doe",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop",
          text: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          timeRemaining: "5 min ago"
        }
      ],
      isRepliesExpanded: true
    },
    {
      id: 2,
      name: "Jane Doe",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop",
      text: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      timeRemaining: "5 min ago",
      replies: [],
      isRepliesExpanded: false
    },
    {
      id: 3,
      name: "Jane Doe",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop",
      text: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
      timeRemaining: "5 min ago",
      replies: [],
      isRepliesExpanded: false
    }
  ];

  return (
    <div className="bg-[#fcfaf7] border-[0.5px] border-[var(--alt-sec,#e4ded2)] rounded-[12px] p-[24px] w-full max-w-[1116px] flex flex-col items-start justify-center gap-[24px] mt-[48px] shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-[12px] justify-center">
        <MessageSquare className="size-[24px] text-[var(--heading,#1a1a1a)]" />
        <h2 className="font-[family-name:var(--font-figtree)] font-semibold text-[19px] leading-[29.2px] tracking-[0.38px] text-[var(--heading,#1a1a1a)]">
          Comments ( 20,000 )
        </h2>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-[24px] items-start w-full">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-[16px] items-start w-full">
            
            {/* Main Comment */}
            <div className="flex flex-col gap-[8px] items-start w-full">
              <div className="flex items-center gap-[12px]">
                <img src={comment.avatar} alt="Avatar" className="size-[40px] rounded-full object-cover shadow-sm" />
                <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)]">
                  {comment.name}
                </span>
              </div>
              <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--body,#5a5a5a)] min-w-full">
                {comment.text}
              </p>
              
              <div className="flex items-start gap-[15px] mt-[4px]">
                <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--place-holder,#9a9a9a)]">
                  {comment.timeRemaining}
                </span>
                <button className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] leading-normal text-[var(--place-holder,#9a9a9a)] hover:text-black transition-colors">
                  View replies ( 20 )
                </button>
                <button className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--body,#5a5a5a)] hover:text-black transition-colors">
                  Reply
                </button>
              </div>
            </div>

            {/* Nested Replies */}
            {comment.isRepliesExpanded && comment.replies.length > 0 && (
              <div className="flex flex-col gap-[16px] items-start pl-[40px] w-full mt-[8px]">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex flex-col gap-[8px] items-start w-full">
                    <div className="flex items-center gap-[12px]">
                      <img src={reply.avatar} alt="Avatar" className="size-[28px] rounded-full object-cover shadow-sm" />
                      <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--sub-head,#3a3a3a)]">
                        {reply.name}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--body,#5a5a5a)] min-w-full">
                      {reply.text}
                    </p>
                    <div className="flex items-start gap-[15px] mt-[4px]">
                      <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--place-holder,#9a9a9a)]">
                        {reply.timeRemaining}
                      </span>
                      <button className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] leading-normal text-[var(--place-holder,#9a9a9a)] hover:text-black transition-colors">
                        View replies ( 20 )
                      </button>
                      <button className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--body,#5a5a5a)] hover:text-black transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--body,#5a5a5a)] mt-[8px] hover:text-[#f95c4b] transition-colors">
                  Hide replies
                </button>
              </div>
            )}
          </div>
        ))}
        
        {/* Load More Trigger */}
        <div className="flex flex-col items-center justify-center w-full mt-[8px]">
          <div className="bg-transparent rounded-[6px] flex items-center justify-center transition-colors">
            <button className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--sub-head,#3a3a3a)] underline hover:text-[#f95c4b] transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-[12px] items-center w-full mt-[16px]">
        <div className="bg-[#fcfaf7] border border-[var(--alt-sec,#e4ded2)] rounded-[32px] shadow-sm flex-1 h-[40px] flex items-center px-[16px] py-[12px] gap-[12px] focus-within:border-[#a0a0a0] transition-colors">
          <button className="hover:opacity-70 transition-opacity flex items-center justify-center">
            <Smile className="size-[24px] text-black" />
          </button>
          <input 
            type="text" 
            placeholder="Join the conversation ..."
            className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[#1a1a1a] placeholder:text-[var(--place-holder,#9a9a9a)] overflow-hidden text-ellipsis whitespace-nowrap"
          />
        </div>
        
        <button className="bg-[var(--cta,#f95c4b)] border border-[var(--alt-sec,#e4ded2)] hover:bg-[#e05243] shadow-sm transition-colors rounded-[32px] h-[40px] px-[16px] py-[12px] flex items-center justify-center">
          <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-white">
            Send
          </span>
        </button>
      </div>

    </div>
  );
}
