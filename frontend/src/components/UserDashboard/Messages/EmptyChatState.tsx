import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function EmptyChatState() {
  return (
    <div className="flex-1 bg-[var(--bg-2,#faf8f5)] flex flex-col items-center justify-center h-screen border-[#e2e2e2] border-l-[0.5px]">
      <div className="bg-[var(--bg,#f6f4f1)] p-6 rounded-full border border-[var(--alt-sec,#e4ded2)] mb-6">
        <MessageSquare className="size-12 text-[#aaa]" />
      </div>
      <h3 className="font-[family-name:var(--font-fjalla)] text-[28px] text-[var(--heading,#1a1a1a)] mb-2">
        Your Messages
      </h3>
      <p className="font-[family-name:var(--font-figtree)] text-[16px] text-[#5a5a5a]">
        Select a conversation from the sidebar to start chatting.
      </p>
    </div>
  );
}
