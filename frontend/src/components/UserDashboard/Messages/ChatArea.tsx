import React from 'react';
import Image from 'next/image';
import { Info, AlignLeft, Italic, Bold, Paperclip } from 'lucide-react';
import MessageBubble, { ChatMessage } from './MessageBubble';
import { Conversation } from './ConversationItem';

interface ChatAreaProps {
  conversation: Conversation;
  messages: ChatMessage[];
}

export default function ChatArea({ conversation, messages }: ChatAreaProps) {
  return (
    <div className="bg-[var(--bg,#f6f4f1)] flex flex-col h-screen flex-1 relative min-w-0">
      {/* Header */}
      <div className="bg-[var(--bg-2,#faf8f5)] border-b border-[#e2e2e2] px-[24px] py-[16px] flex justify-between items-center shrink-0 w-full z-10 relative">
        <div className="flex items-center gap-[12px]">
          <div className="flex flex-col items-start overflow-hidden relative rounded-[31px] shrink-0 size-[48px]">
            <Image src={conversation.avatar} alt={conversation.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-[4px] items-start">
            <p className="font-[family-name:var(--font-inter)] font-medium text-[16px] text-[#1e1e1e]">
              {conversation.name}
            </p>
            <div className="flex items-center gap-[7px]">
              <div className="bg-[#289e11] rounded-full size-[8px]" />
              <p className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#757575]">
                Active
              </p>
            </div>
          </div>
        </div>
        <button className="text-[#1a1a1a] hover:bg-[#e6e6e6] p-2 rounded-full transition-colors">
          <Info className="size-[24px]" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-[24px] pt-[24px] pb-[160px] flex flex-col z-0">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-[24px] left-[24px] right-[24px] bg-white border border-[var(--alt-sec,#e4ded2)] rounded-[12px] h-[120px] shadow-sm z-20 flex flex-col justify-between p-[16px]">
        <textarea 
          placeholder="Write your message here"
          className="w-full resize-none outline-none font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#1a1a1a] placeholder:text-[#aaa] bg-transparent flex-1"
        />
        <div className="flex items-center justify-between mt-[8px]">
          <div className="flex items-center gap-[20px] text-[#1a1a1a]">
            <button className="hover:text-black transition-colors"><AlignLeft className="size-[16px]" /></button>
            <button className="hover:text-black transition-colors"><Italic className="size-[16px]" /></button>
            <button className="hover:text-black transition-colors"><Bold className="size-[16px]" /></button>
            <button className="hover:text-black transition-colors"><Paperclip className="size-[16px]" /></button>
          </div>
          <button className="bg-[var(--cta,#f95c4b)] hover:bg-[#ff7a6c] transition-colors border border-[var(--light-shade1,#ff7a6c)] rounded-[40px] px-[18px] py-[10px] text-white font-[family-name:var(--font-inter)] font-medium text-[14px]">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
