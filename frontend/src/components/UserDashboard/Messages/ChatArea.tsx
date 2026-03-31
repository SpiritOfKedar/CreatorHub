import React, { useState } from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';
import MessageBubble, { ChatMessage } from './MessageBubble';
import { Conversation } from './ConversationItem';
import RichTextEditor from './RichTextEditor';

interface ChatAreaProps {
  conversation: Conversation;
  messages: ChatMessage[];
  onSendMessage?: (content: string) => void;
}

export default function ChatArea({ conversation, messages, onSendMessage }: ChatAreaProps) {
  const [messageContent, setMessageContent] = useState('');

  const handleSend = () => {
    if (!messageContent || messageContent === '<p></p>') return;
    
    if (onSendMessage) {
      onSendMessage(messageContent);
    } else {
      console.log('Sending message:', messageContent);
    }
    
    setMessageContent('');
  };

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
      <div className="absolute bottom-[24px] left-[24px] right-[24px] bg-white border border-[var(--alt-sec,#e4ded2)] rounded-[12px] min-h-[140px] shadow-sm z-20 flex flex-col p-[16px]">
        <RichTextEditor 
          content={messageContent}
          onChange={setMessageContent}
          onSend={handleSend}
          placeholder="Write your message here..."
        />
      </div>
    </div>
  );
}
