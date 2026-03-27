import React from 'react';
import Image from 'next/image';

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isUnread?: boolean;
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`border-[var(--alt-sec,#e4ded2)] border-b border-t-[0.5px] border-solid flex gap-[8px] items-center px-[16px] py-[12px] relative shrink-0 w-full cursor-pointer transition-colors ${isActive ? 'bg-[var(--bg-2,#faf8f5)]' : 'hover:bg-[#fcfaf7]'}`}
    >
      <div className="flex flex-col items-start overflow-hidden relative rounded-[31px] shrink-0 size-[40px]">
        <Image 
          src={conversation.avatar} 
          alt={conversation.name} 
          fill 
          className="object-cover"
        />
      </div>
      <div className="flex flex-[1_0_0] flex-col items-start min-w-0 relative">
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <p className={`font-[family-name:var(--font-figtree)] ${conversation.isUnread ? 'font-bold text-[#1a1a1a]' : 'font-bold text-[var(--body,#5a5a5a)]'} leading-[25.8px] relative shrink-0 text-[16px] tracking-[0.32px] truncate`}>
            {conversation.name}
          </p>
          {conversation.isUnread && (
            <div className="w-[8px] h-[8px] rounded-full bg-[var(--cta,#f95c4b)] shrink-0" />
          )}
        </div>
        <div className="flex items-center relative shrink-0 w-full">
          <p className={`font-[family-name:var(--font-figtree)] font-medium leading-[18.3px] relative shrink-0 ${conversation.isUnread ? 'text-[#3a3a3a]' : 'text-[var(--body,#5a5a5a)]'} text-[13px] tracking-[0.26px] truncate max-w-[90%]`}>
            {conversation.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
