'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Heart } from 'lucide-react';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/src/store/useAuthStore';

interface InteractionBarProps {
  postId: string;
  initialLikes: number;
  initialDislikes: number;
  initialUserReaction: 'like' | 'dislike' | null;
  initialIsFavorited: boolean;
}

export default function InteractionBar({ postId, initialLikes, initialDislikes, initialUserReaction, initialIsFavorited }: InteractionBarProps) {
  const { token } = useAuthStore();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(initialUserReaction);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (!token) {
      toast.error('Please login to react to this post');
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await api.post(`/user/posts/${postId}/react`, { type });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setUserReaction(res.data.userReaction);
    } catch (error) {
      toast.error('Failed to update reaction');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!token) {
      toast.error('Please login to favorite this post');
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await api.post(`/user/posts/${postId}/favorite`);
      setIsFavorited(res.data.isFavorited);
      toast.success(res.data.isFavorited ? 'Added to library' : 'Removed from library');
    } catch (error) {
      toast.error('Failed to update favorite status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-[16px] mt-6 bg-white p-4 rounded-[12px] border border-[#d8d1c7] w-full max-w-[1119px] shrink-0">
      <button 
        onClick={() => handleReaction('like')}
        className={`flex items-center gap-[8px] px-4 py-2 rounded-full transition-colors ${userReaction === 'like' ? 'bg-[#f6f4f1] border border-[#d8d1c7]' : 'hover:bg-[#f6f4f1]'}`}
        disabled={loading}
      >
        <ThumbsUp size={20} className={userReaction === 'like' ? 'fill-[#1a1a1a] text-[#1a1a1a]' : 'text-[#5a5a5a]'} />
        <span className="font-['Figtree',sans-serif] font-medium text-[15px]">{likes}</span>
      </button>

      <button 
        onClick={() => handleReaction('dislike')}
        className={`flex items-center gap-[8px] px-4 py-2 rounded-full transition-colors ${userReaction === 'dislike' ? 'bg-[#f6f4f1] border border-[#d8d1c7]' : 'hover:bg-[#f6f4f1]'}`}
        disabled={loading}
      >
        <ThumbsDown size={20} className={userReaction === 'dislike' ? 'fill-[#1a1a1a] text-[#1a1a1a]' : 'text-[#5a5a5a]'} />
        <span className="font-['Figtree',sans-serif] font-medium text-[15px]">{dislikes}</span>
      </button>

      <button 
        onClick={handleFavorite}
        className={`flex items-center gap-[8px] px-4 py-2 rounded-full transition-colors ${isFavorited ? 'bg-[#fff5f5] border border-[#fecaca]' : 'hover:bg-[#f6f4f1]'}`}
        disabled={loading}
      >
        <Heart size={20} className={isFavorited ? 'fill-[#f95c4b] text-[#f95c4b]' : 'text-[#5a5a5a]'} />
        <span className="font-['Figtree',sans-serif] font-medium text-[15px]">{isFavorited ? 'Favorited' : 'Favorite'}</span>
      </button>
    </div>
  );
}
