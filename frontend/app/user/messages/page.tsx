"use client";

import React, { useState } from 'react';
import DashboardSidebar from '@/src/components/UserDashboard/DashboardSidebar';
import ConversationList from '@/src/components/UserDashboard/Messages/ConversationList';
import ChatArea from '@/src/components/UserDashboard/Messages/ChatArea';
import EmptyChatState from '@/src/components/UserDashboard/Messages/EmptyChatState';
import { Conversation } from '@/src/components/UserDashboard/Messages/ConversationItem';
import { ChatMessage } from '@/src/components/UserDashboard/Messages/MessageBubble';

// Mock data matching the Figma empty/active states
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Creator name',
    avatar: '/assets/messages/avatar.png',
    lastMessage: 'Text message dbvfjbjvbb......',
    isUnread: true,
  },
  {
    id: '2',
    name: 'Creator name',
    avatar: '/assets/messages/avatar.png',
    lastMessage: 'Text message dbvfjbjvbb......',
  },
  {
    id: '3',
    name: 'Creator name',
    avatar: '/assets/messages/avatar.png',
    lastMessage: 'Text message dbvfjbjvbb......',
  },
  {
    id: '4',
    name: 'Creator name',
    avatar: '/assets/messages/avatar.png',
    lastMessage: 'Text message dbvfjbjvbb......',
  },
  {
    id: '5',
    name: 'Creator name',
    avatar: '/assets/messages/avatar.png',
    lastMessage: 'Text message dbvfjbjvbb......',
  },
  {
    id: '6',
    name: 'Creator name',
    avatar: '/assets/messages/avatar.png',
    lastMessage: 'Text message dbvfjbjvbb......',
  },
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: 'm1',
      text: 'Hey! Check out my exclusive new unreleased video. Let me know what you think!',
      isSender: false,
      avatar: '/assets/messages/avatar.png',
    },
    {
      id: 'm2',
      text: 'Thanks! I will review it right away and get back to you by the end of the day.',
      isSender: true,
      avatar: '/assets/messages/avatar.png',
    }
  ]
};

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === selectedId);
  const activeMessages = selectedId ? MOCK_MESSAGES[selectedId] || [] : [];

  return (
    <div className="min-h-screen bg-[var(--bg,#f6f4f1)] flex relative overflow-hidden">
      <DashboardSidebar />
      
      {/* Main Content Area - Split into Left Pane (List) and Right Pane (Chat) */}
      <main className="flex-1 ml-[240px] flex overflow-hidden">
        <ConversationList 
          conversations={MOCK_CONVERSATIONS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        
        {activeConversation ? (
          <ChatArea conversation={activeConversation} messages={activeMessages} />
        ) : (
          <EmptyChatState />
        )}
      </main>
    </div>
  );
}
