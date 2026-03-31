import React from 'react';
import Image from 'next/image';

export interface ChatMessage {
  id: string;
  text: string; // This now contains HTML from Tiptap
  isSender: boolean;
  avatar: string;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const renderContent = (content: string) => {
    return (
      <div 
        className="message-content prose prose-sm max-w-none text-inherit font-[family-name:var(--font-figtree)]"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  };

  if (message.isSender) {
    return (
      <div className="flex gap-[12px] items-end justify-end w-full mb-[24px]">
        <div className="bg-[rgba(249,92,75,0.08)] border border-[var(--bg-2,#faf8f5)] border-solid rounded-[20px] rounded-tr-[4px] px-[20px] py-[16px] max-w-[70%] text-[#1a1a1a]">
          {renderContent(message.text)}
        </div>
        <div className="flex flex-col items-start overflow-hidden relative rounded-[31px] shrink-0 size-[28px] mb-[4px]">
          <Image src={message.avatar} alt="Avatar" fill className="object-cover" />
        </div>
        <style jsx global>{`
          .message-content h1 { font-size: 1.4rem; font-weight: bold; margin: 0.5rem 0; }
          .message-content h2 { font-size: 1.2rem; font-weight: bold; margin: 0.4rem 0; }
          .message-content p { margin: 0.2rem 0; }
          .message-content ul, .message-content ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex gap-[12px] items-start justify-start w-full mb-[24px]">
      <div className="flex flex-col items-start overflow-hidden relative rounded-[31px] shrink-0 size-[28px] mt-[4px]">
        <Image src={message.avatar} alt="Avatar" fill className="object-cover" />
      </div>
      <div className="bg-[var(--bg-2,#faf8f5)] border border-[var(--alt-sec,#e4ded2)] border-solid rounded-[20px] rounded-tl-[4px] px-[20px] py-[16px] max-w-[70%] text-[#1a1a1a]">
        {renderContent(message.text)}
      </div>
    </div>
  );
}
