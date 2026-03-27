import React from 'react';
import { Search } from 'lucide-react';
import ConversationItem, { Conversation } from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="bg-[var(--bg,#f6f4f1)] border-[var(--alt-sec,#e4ded2)] border-r-[0.5px] border-solid flex flex-col h-screen w-[304px] shrink-0">
      <div className="px-[16px] pt-[24px] pb-[16px] shrink-0 flex flex-col gap-[20px]">
        <h2 className="font-[family-name:var(--font-fjalla)] leading-[42.1px] text-[color:var(--heading,#1a1a1a)] text-[28px] tracking-[0.56px]">
          Your Messages
        </h2>
        <div className="border-[#d2d8e3] border-[0.5px] border-solid bg-[#fefefe] flex gap-[8px] items-center px-[12px] py-[8px] rounded-[20px] w-full relative shadow-[inset_0px_-1px_4px_0px_rgba(236,238,246,0.25)]">
          <Search className="size-[16px] text-[#aaa] shrink-0" />
          <input 
            type="text" 
            placeholder="Search conversation" 
            className="font-['Inter'] font-normal text-[12px] bg-transparent outline-none flex-1 text-[#aaa] placeholder:text-[#aaa]"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col pb-[24px]">
        {conversations.map((conv) => (
          <ConversationItem 
            key={conv.id}
            conversation={conv}
            isActive={selectedId === conv.id}
            onClick={() => onSelect(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}
